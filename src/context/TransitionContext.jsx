import { createContext, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();
  const busyRef = useRef(false);

  const go = (path) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setTransitioning(true);
    setTimeout(() => navigate(path), 750);
    setTimeout(() => {
      setTransitioning(false);
      busyRef.current = false;
    }, 1650);
  };

  return (
    <TransitionContext.Provider value={{ transitioning, go }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useSceneTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useSceneTransition must be used within a TransitionProvider');
  return ctx;
}
