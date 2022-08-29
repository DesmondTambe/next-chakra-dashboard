import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDL-dZddsOgJVnJwyQb3ipngSsJ7Gl5-Cs",
  authDomain: "ecommerce-b802c.firebaseapp.com",
  projectId: "ecommerce-b802c",
  storageBucket: "ecommerce-b802c.appspot.com",
  messagingSenderId: "960582587645",
  appId: "1:960582587645:web:f3668fd222a25921379a94",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();

export default firebaseConfig;
