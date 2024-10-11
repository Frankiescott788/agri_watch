// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnx0UdyNHUexi99XLRXWNg-25SAc6UTRc",
  authDomain: "agriwatch-af852.firebaseapp.com",
  projectId: "agriwatch-af852",
  storageBucket: "agriwatch-af852.appspot.com",
  messagingSenderId: "29529907817",
  appId: "1:29529907817:web:e5be7a9a0e151f448cf8f8",
  measurementId: "G-58D7H2HZX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
