import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChYFHQqi6abS5IpNaD6MxdB0ZQi_XITnE",
  authDomain: "adminofquiz.firebaseapp.com",
  projectId: "adminofquiz",
  storageBucket: "adminofquiz.firebasestorage.app",
  messagingSenderId: "328804395592",
  appId: "1:328804395592:web:65ec32f43285be1f9d067d"
};

// Check if a Firebase app is already initialized, if not initialize it
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Initialize Firestore
const db = getFirestore(app);

export { app, db };
