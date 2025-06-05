// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMefnGNcEEYOZcqSU7-hZs0nA9C3IMG6c",
  authDomain: "arakoo-internship.firebaseapp.com",
  projectId: "arakoo-internship",
  storageBucket: "arakoo-internship.firebasestorage.app",
  messagingSenderId: "164501400016",
  appId: "1:164501400016:web:b5012d6729e70b03f271d5",
  measurementId: "G-XYWVNZ2DS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };