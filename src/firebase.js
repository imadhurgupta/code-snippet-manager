import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9_Ech69TlN2Iw6fNuJFrxD2FnGY9EC2I",
  authDomain: "smiling-rhythm-458113-p4.firebaseapp.com",
  projectId: "smiling-rhythm-458113-p4",
  storageBucket: "smiling-rhythm-458113-p4.firebasestorage.app",
  messagingSenderId: "506882005035",
  appId: "1:506882005035:web:5e1a52ba5ab8992ff2726e",
  measurementId: "G-1Z8VS5FLGM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;