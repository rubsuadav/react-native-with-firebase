// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvoSqEX5-tDD47b4VoFXkO7iglQOV92G8",
  authDomain: "subcripciones-9d96d.firebaseapp.com",
  databaseURL:
    "https://subcripciones-9d96d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "subcripciones-9d96d",
  storageBucket: "subcripciones-9d96d.appspot.com",
  messagingSenderId: "1078641327786",
  appId: "1:1078641327786:web:f28bf8c49fad5eac419ad3",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
