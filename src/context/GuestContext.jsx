import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'bs_guest_name';

const GuestContext = createContext(null);

export function GuestProvider({ children }) {
  const [guestName, setGuestNameState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || '',
  );

  const setGuestName = (name) => {
    const trimmed = name.trim();
    localStorage.setItem(STORAGE_KEY, trimmed);
    setGuestNameState(trimmed);
  };

  const clearGuestName = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGuestNameState('');
  };

  const value = useMemo(
    () => ({ guestName, setGuestName, clearGuestName }),
    [guestName],
  );

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
}

export function useGuest() {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error('useGuest must be used within a GuestProvider');
  return ctx;
}
