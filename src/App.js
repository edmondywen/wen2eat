import logo from './logo.svg';
import './App.css';

//Note: Figure out how to move Firebase initialization stuff to firebase.js and 
//have correct load order 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA22TwxWMJI6G9MqXG28aRiGZkXcluNXco",
  authDomain: "wen2eat.firebaseapp.com",
  projectId: "wen2eat",
  storageBucket: "wen2eat.appspot.com",
  messagingSenderId: "718202186206",
  appId: "1:718202186206:web:bdc477289c0f8a2242154f",
  measurementId: "G-QFS90PYCG8"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//db stays in App.js
const db = firebase.firestore();

function makeIngredient(name, expirationdate) {
  return (
    <div class = "ingredient">
      <p>Ingredient: {name} </p>
      <p>Expires in: {expirationdate}</p>
      <button > 
          Delete ingredient (this button does nothing)
        </button> 
    </div>
  ); 
}

function addBread() {
  db.collection("pantry").add({
    ingredient: "bread",
    expirationdate: "10 days"
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
}

function printDatabase(){
  db.collection("pantry").get()
      //snapshot is the status of the collection at the current time 
    //docs.map.(etc) gets an array of the documents in the database 
  .then((snapshot) => {console.log(snapshot.docs.map((doc) => doc.data()))}) 
  .catch((error) => console.error("Error getting documents: ", error));
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {makeIngredient("apples", "2 days")}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick = {() =>addBread()}>Add bread to database</button>
        
        <button onClick = {() =>printDatabase()}>Print database contents to console</button>

        
      </header>

      
    </div>
  );
}

export default App;
