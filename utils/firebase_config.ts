import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_FIREBASE_API_KEY,
  appId: process.env.NEXT_APP_FIREBASE_ID,
  authDomain: process.env.NEXT_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();

export default firebaseConfig;
