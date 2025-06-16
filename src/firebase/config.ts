// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNZGmUAXjBtesPZ79ZEvEVCUIo6vOhVBU",
  authDomain: "reservas-padel-93e9d.firebaseapp.com",
  databaseURL: "https://reservas-padel-93e9d-default-rtdb.firebaseio.com",
  projectId: "reservas-padel-93e9d",
  storageBucket: "reservas-padel-93e9d.firebasestorage.app",
  messagingSenderId: "524627745068",
  appId: "1:524627745068:web:95c788ef9b653a63a1b489"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };