// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlJTQZRKHtjFtzi0jYdRLxvCG2XWKSpG4",
  authDomain: "react-auth-demo-9720d.firebaseapp.com",
  projectId: "react-auth-demo-9720d",
  storageBucket: "react-auth-demo-9720d.appspot.com",
  messagingSenderId: "704578901911",
  appId: "1:704578901911:web:7ad61a640f40fdbe4596d2",
  measurementId: "G-SLXGWXC0Q5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
