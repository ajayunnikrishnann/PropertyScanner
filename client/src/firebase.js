// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "propertyscanner-6e49c.firebaseapp.com",
  projectId: "propertyscanner-6e49c",
  storageBucket: "propertyscanner-6e49c.appspot.com",
  messagingSenderId: "1080008947800",
  appId: "1:1080008947800:web:594daac526674ca1dc322d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);