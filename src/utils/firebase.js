// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJlV5_G8nlO6O34v79LlHAEXc0U58Bd2I",
  authDomain: "etflixgpt-c9e92.firebaseapp.com",
  projectId: "etflixgpt-c9e92",
  storageBucket: "etflixgpt-c9e92.firebasestorage.app",
  messagingSenderId: "536829706823",
  appId: "1:536829706823:web:f8dbd57574d1551d93a762",
  measurementId: "G-G6FJ4XC6YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();