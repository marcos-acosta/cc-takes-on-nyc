// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ccnyc-scavenger-hunt.firebaseapp.com",
  projectId: "ccnyc-scavenger-hunt",
  storageBucket: "ccnyc-scavenger-hunt.firebasestorage.app",
  messagingSenderId: "152596103740",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-Y8PL9Z7STN",
};

// Initialize Firebase
export const db = getFirestore(initializeApp(firebaseConfig));
