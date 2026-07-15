import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuestProvider } from './context/GuestContext';
import { TransitionProvider } from './context/TransitionContext';
import IntroSplash from './components/IntroSplash';
import PageTransitionOverlay from './components/PageTransitionOverlay';
import RequireGuest from './components/RequireGuest';
import WelcomePage from './pages/WelcomePage';
import DetailsPage from './pages/DetailsPage';
import GiftsPage from './pages/GiftsPage';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const dismissIntro = useCallback(() => setShowIntro(false), []);

  return (
    <GuestProvider>
      <TransitionProvider>
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-cream to-lavender-50 font-body text-ink">
          {showIntro && <IntroSplash onDone={dismissIntro} />}
          <PageTransitionOverlay />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/detalles"
              element={
                <RequireGuest>
                  <DetailsPage />
                </RequireGuest>
              }
            />
            <Route
              path="/regalos"
              element={
                <RequireGuest>
                  <GiftsPage />
                </RequireGuest>
              }
            />
          </Routes>
        </div>
      </TransitionProvider>
    </GuestProvider>
  );
}

export default App;
