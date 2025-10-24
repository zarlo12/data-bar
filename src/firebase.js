// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUeEMpxpzZ864HVU8OU69uQ6HH1LYX0dA",
  authDomain: "imagen-ia-845a3.firebaseapp.com",
  projectId: "imagen-ia-845a3",
  storageBucket: "imagen-ia-845a3.firebasestorage.app",
  messagingSenderId: "134868092813",
  appId: "1:134868092813:web:d67cbcb860ecdfcaa25fc4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
