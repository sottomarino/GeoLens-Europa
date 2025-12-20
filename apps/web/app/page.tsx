'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';

const Map = dynamic(() => import('./components/Map'), { ssr: false });
const Globe = dynamic(() => import('./components/Globe'), { ssr: false });
const LandingPage = dynamic(() => import('./components/LandingPageB'), { ssr: false });
const AuthPopup = dynamic(() => import('./components/AuthPopup'), { ssr: false });

// Email autorizzate ad accedere all'app
const ALLOWED_EMAILS = ['bitvrbit@gmail.com'];

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [mode, setMode] = useState<'2D' | '3D'>('2D');
  const [selectedLayer, setSelectedLayer] = useState<'water' | 'mineral' | 'landslide' | 'seismic' | 'satellite' | 'precipitation'>('water');

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  const handleBackToHome = () => {
    setShowLanding(true);
  };

  const handleAuthSuccess = () => {
    // User is now logged in, app will show automatically
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowLanding(true);
  };

  // Show landing page
  if (showLanding) {
    return <LandingPage onEnter={handleEnterApp} />;
  }

  // Show auth popup if not logged in (after clicking Explore)
  // Show the app in the background with auth popup overlay
  if (!user && authChecked) {
    return (
      <div className="w-full h-screen relative">
        {/* App preview in background */}
        <div className="absolute inset-0 pointer-events-none">
          <Map selectedLayer={selectedLayer} onLayerChange={setSelectedLayer} />
        </div>
        {/* Auth popup overlay */}
        <AuthPopup
          isOpen={true}
          onSuccess={handleAuthSuccess}
          onBackToHome={handleBackToHome}
        />
      </div>
    );
  }

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white/50 text-sm font-light tracking-wider">Loading...</div>
      </div>
    );
  }

  // Check if user email is authorized
  const isAuthorized = user && user.email && ALLOWED_EMAILS.includes(user.email);

  // User is logged in but not authorized
  if (user && !isAuthorized) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl font-light tracking-wider mb-4">Access Denied</div>
          <p className="text-white/50 text-sm font-light mb-6">
            This email is not authorized to access GeoLens Europa.
          </p>
          <p className="text-white/30 text-xs mb-8">{user.email}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleLogout}
              className="px-6 py-2 border border-white/30 text-white/70 text-sm font-light hover:bg-white hover:text-black transition-all"
            >
              Logout
            </button>
            <button
              onClick={handleBackToHome}
              className="px-6 py-2 bg-white text-black text-sm font-light hover:bg-black hover:text-white border border-white transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User is logged in and authorized - show the app
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
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 truncate max-w-[200px]">{user.email}</p>
              <button
                onClick={handleLogout}
                className="text-xs text-red-500 hover:text-red-700 mt-1"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
