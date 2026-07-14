import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export function useRsvp(guestName) {
  const [attending, setAttending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!guestName) {
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      const { data, error: rpcError } = await supabase.rpc('get_my_rsvp', {
        p_guest_name: guestName,
      });
      if (cancelled) return;
      if (rpcError) {
        setError(rpcError.message);
      } else {
        setAttending(data ? data.attending : null);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [guestName]);

  const respond = useCallback(
    async (value) => {
      setSaving(true);
      const { data, error: rpcError } = await supabase.rpc('set_rsvp', {
        p_guest_name: guestName,
        p_attending: value,
      });
      setSaving(false);
      if (rpcError) {
        setError(rpcError.message);
        return { ok: false, error: rpcError.message };
      }
      setAttending(data.attending);
      return { ok: true };
    },
    [guestName],
  );

  return { attending, loading, saving, error, respond };
}
