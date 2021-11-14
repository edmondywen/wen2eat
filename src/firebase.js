// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgpxgjvTtYR5w8Iw99_pyEzniNlhju1S8",
    authDomain: "wen2eat1.firebaseapp.com",
    projectId: "wen2eat1",
    storageBucket: "wen2eat1.appspot.com",
    messagingSenderId: "664151191656",
    appId: "1:664151191656:web:7b0e5f969a27fa513a8bdd",
    measurementId: "G-R2F61TSCHM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;