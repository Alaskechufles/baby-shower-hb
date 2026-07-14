import { Navigate } from 'react-router-dom';
import { useGuest } from '../context/GuestContext';

export default function RequireGuest({ children }) {
  const { guestName } = useGuest();
  if (!guestName) return <Navigate to="/" replace />;
  return children;
}
