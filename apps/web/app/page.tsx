'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';

const Map = dynamic(() => import('./components/Map'), { ssr: false });
const Globe = dynamic(() => import('./components/Globe'), { ssr: false });
const LandingPage = dynamic(() => import('./components/LandingPageB'), { ssr: false });
const AuthPopup = dynamic(() => import('./components/AuthPopup'), { ssr: false });

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<'2D' | '3D'>('2D');
  const [selectedLayer, setSelectedLayer] = useState<'water' | 'mineral' | 'landslide' | 'seismic' | 'satellite' | 'precipitation'>('water');

  // Check if user has already seen the landing
  useEffect(() => {
    const hasSeenLanding = sessionStorage.getItem('geolens-landing-seen');
    if (hasSeenLanding === 'true') {
      setShowLanding(false);
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Show auth popup after entering the app (if not logged in)
  useEffect(() => {
    if (!showLanding && !user) {
      const hasSkippedAuth = sessionStorage.getItem('geolens-auth-skipped');
      if (hasSkippedAuth !== 'true') {
        const timer = setTimeout(() => {
          setShowAuthPopup(true);
        }, 3000); // Show after 3 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [showLanding, user]);

  const handleEnterApp = () => {
    sessionStorage.setItem('geolens-landing-seen', 'true');
    setShowLanding(false);
  };

  const handleAuthClose = () => {
    sessionStorage.setItem('geolens-auth-skipped', 'true');
    setShowAuthPopup(false);
  };

  const handleAuthSuccess = () => {
    setShowAuthPopup(false);
  };

  if (showLanding) {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-full h-screen relative">
        {mode === '2D' ? (
          <Map selectedLayer={selectedLayer} onLayerChange={setSelectedLayer} />
        ) : (
          <Globe selectedLayer={selectedLayer} />
        )}

        <div className="absolute top-4 left-4 bg-white p-4 rounded shadow z-10">
          <h1 className="text-xl font-bold mb-2">GeoLens Europa</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setMode('2D')}
              className={`px-3 py-1 rounded ${mode === '2D' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              2D Map
            </button>
            <button
              onClick={() => setMode('3D')}
              className={`px-3 py-1 rounded ${mode === '3D' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              3D Globe
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">Click on the map to inspect a cell.</p>
          {user && (
            <p className="text-xs text-green-600 mt-1">Logged in: {user.email}</p>
          )}
        </div>

        {/* Auth Popup */}
        <AuthPopup
          isOpen={showAuthPopup}
          onClose={handleAuthClose}
          onSuccess={handleAuthSuccess}
        />
      </div>
    </main>
  );
}
