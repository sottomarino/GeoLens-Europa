import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6vdEBs_hpyrJSX4tLBZguIY3X5wAu4ps",
  authDomain: "geolens-europa.firebaseapp.com",
  projectId: "geolens-europa",
  storageBucket: "geolens-europa.firebasestorage.app",
  messagingSenderId: "156742462828",
  appId: "1:156742462828:web:fdc449708a28c815359749"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };
