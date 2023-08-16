// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: "subcripciones-9d96d.firebaseapp.com",
  databaseURL:
    "https://subcripciones-9d96d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "subcripciones-9d96d",
  storageBucket: "subcripciones-9d96d.appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: "G-C2PEP07KGH",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
console.log("FIREBASE_STORAGE: ", FIREBASE_STORAGE);
