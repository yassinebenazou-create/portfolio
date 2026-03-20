import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';

const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
];

for (const key of requiredEnvVars) {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let analytics: Analytics | null = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  if (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
    analytics = getAnalytics(app);
  }
} catch (err) {
  throw new Error(`Firebase initialization failed: ${err instanceof Error ? err.message : String(err)}`);
}

export const googleProvider = new GoogleAuthProvider();
export { app, db, auth, analytics };
