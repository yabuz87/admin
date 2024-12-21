// User Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSOsnc5uFzsRuVPg3reZzpZwkpIpoOv-Q",
  authDomain: "quizapp-9d1e6.firebaseapp.com",
  projectId: "quizapp-9d1e6",
  storageBucket: "quizapp-9d1e6.firebasestorage.app",
  messagingSenderId: "249222343554",
  appId: "1:249222343554:web:a5e3545b2caf12fd16bd9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { app, auth, db, provider };
