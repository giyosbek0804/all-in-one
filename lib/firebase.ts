import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// True only when all fields required for auth (including authDomain) are present at build time
export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId
);

// authDomain is required by signInWithPopup; fall back to placeholders so SSR/build
// never throws, but auth calls will be blocked by the isFirebaseConfigured guard.
const app = getApps().length
  ? getApp()
  : initializeApp({
      apiKey: firebaseConfig.apiKey || "build-placeholder",
      authDomain: firebaseConfig.authDomain || "build-placeholder.firebaseapp.com",
      projectId: firebaseConfig.projectId || "build-placeholder",
      storageBucket: firebaseConfig.storageBucket || "build-placeholder.appspot.com",
      messagingSenderId: firebaseConfig.messagingSenderId || "000000000000",
      appId: firebaseConfig.appId || "1:000000000000:web:build-placeholder",
    });

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };



