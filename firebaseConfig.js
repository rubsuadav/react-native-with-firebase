// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXCtpL4a64zIlwAQv-Syj8IBWEYy0LsWo",
  authDomain: "prueba-cb62f.firebaseapp.com",
  databaseURL:
    "https://prueba-cb62f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prueba-cb62f",
  storageBucket: "prueba-cb62f.appspot.com",
  messagingSenderId: "903959212753",
  appId: "1:903959212753:web:97336278b40b7e94ad4bf0",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
