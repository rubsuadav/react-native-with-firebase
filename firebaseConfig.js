// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

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

if (location.hostname === "localhost" && location.port !== "8081") {
  const functions = getFunctions(FIREBASE_APP);
  connectFirestoreEmulator(FIREBASE_DB, "127.0.0.1", 8080);
  connectStorageEmulator(FIREBASE_STORAGE, "127.0.0.1", 9199);
  connectAuthEmulator(FIREBASE_AUTH, "http://127.0.0.1:9099");
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
