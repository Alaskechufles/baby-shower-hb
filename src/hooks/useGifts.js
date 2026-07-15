import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

// Matches the server-side normalize_guest_name(): trim + lowercase + collapse
// whitespace, so "mine" is recognized the same way regardless of device.
function normalizeName(name) {
  return (name || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export function useGifts(guestName) {
  const [gifts, setGifts] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // If a realtime event arrives before the initial fetch resolves, the
    // fetch's snapshot may already be stale by the time it lands. Track
    // that so we merge instead of blindly overwriting and losing it.
    let receivedRealtimeUpdate = false;

    async function load() {
      setLoading(true);
      const [giftsRes, claimsRes] = await Promise.all([
        supabase.from('gifts').select('*').order('sort_order', { ascending: true }),
        supabase.from('gift_claims').select('*'),
      ]);
      if (cancelled) return;
      if (giftsRes.error || claimsRes.error) {
        setError(giftsRes.error?.message || claimsRes.error?.message);
      } else {
        setGifts(giftsRes.data);
        if (receivedRealtimeUpdate) {
          setClaims((prev) => {
            const byId = new Map(claimsRes.data.map((c) => [c.id, c]));
            for (const c of prev) {
              if (!byId.has(c.id)) byId.set(c.id, c);
            }
            return [...byId.values()];
          });
        } else {
          setClaims(claimsRes.data);
        }
      }
      setLoading(false);
    }

    load();

    const channel = supabase
      .channel('gift_claims-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'gift_claims' },
        (payload) => {
          receivedRealtimeUpdate = true;
          setClaims((prev) =>
            prev.some((c) => c.id === payload.new.id) ? prev : [...prev, payload.new],
          );
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'gift_claims' },
        (payload) => {
          receivedRealtimeUpdate = true;
          setClaims((prev) => prev.filter((c) => c.id !== payload.old.id));
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const claimGift = useCallback(
    async (giftId) => {
      const { data, error: rpcError } = await supabase.rpc('claim_gift', {
        p_gift_id: giftId,
        p_guest_name: guestName,
        p_qty: 1,
      });
      if (rpcError) {
        setError(rpcError.message);
        return { ok: false, error: rpcError.message };
      }
      setClaims((prev) => (prev.some((c) => c.id === data.id) ? prev : [...prev, data]));
      return { ok: true };
    },
    [guestName],
  );

  const unclaimGift = useCallback(
    async (claimId) => {
      const { error: rpcError } = await supabase.rpc('unclaim_gift', {
        p_claim_id: claimId,
        p_guest_name: guestName,
      });
      if (rpcError) {
        setError(rpcError.message);
        return { ok: false, error: rpcError.message };
      }
      setClaims((prev) => prev.filter((c) => c.id !== claimId));
      return { ok: true };
    },
    [guestName],
  );

  const myNormalized = normalizeName(guestName);

  const giftsDisplay = gifts.map((gift) => {
    const giftClaims = claims.filter((c) => c.gift_id === gift.id);
    const claimed = giftClaims.reduce((sum, c) => sum + c.qty, 0);
    const isComplete = claimed >= gift.needed;
    const myClaimsForGift = giftClaims.filter((c) => normalizeName(c.guest_name) === myNormalized);
    const myQty = myClaimsForGift.reduce((sum, c) => sum + c.qty, 0);
    const pct = gift.needed > 0 ? Math.min(100, Math.round((claimed / gift.needed) * 100)) : 0;
    return {
      ...gift,
      claimed,
      isComplete,
      canClaim: !isComplete,
      myQty,
      pct,
      pluralSuffix: gift.needed === 1 ? '' : 's',
      myClaimId: myClaimsForGift[0]?.id ?? null,
    };
  });

  const myGifts = giftsDisplay
    .filter((g) => g.myQty > 0)
    .map((g) => ({ id: g.id, name: g.name, myQty: g.myQty, claimId: g.myClaimId }));

  const clearError = useCallback(() => setError(null), []);

  return {
    giftsDisplay,
    myGifts,
    loading,
    error,
    clearError,
    claimGift,
    unclaimGift,
  };
}
