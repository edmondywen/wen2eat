import Recs from './Recs.js'
import { Link, Outlet } from "react-router-dom"
import './App.css';
import './Ingredient.css'
import './Links.css'
import {userCollectionID, logout} from "./Login.js"
import { query, limit, orderBy, getDocs, onSnapshot, collection, setDoc, doc, addDoc, getDoc, deleteDoc} from "@firebase/firestore"
import db from '../firebase'
import { useEffect, useState } from "react"
import Pantry from './Pantry.js';

function App() {
  const [ingredients, setIngredients] = useState([]); //array of 3 item arrays where [0] is the item name and [1] is the exp date and [2] if the id
  const [DietList, setDietList] = useState([]);
  const [IntolerancesList, setIntolerancesList] = useState([]);

  const setupFirestoreListener = () => {
    console.log(db);
    return onSnapshot(collection(db, userCollectionID), (snapshot) => 
      setIngredients(snapshot.docs.map((doc) => (
        {ingredient: doc.data().ingredient, expiration: (doc.data().expiration === undefined) ? "" : doc.data().expiration.toDate(), id: doc.id}
        ))
    ))
  }

  useEffect(setupFirestoreListener, []);
  
  return (
    <div className="App">
      <div className="App-header">
        <div className="Header-text">
          <img src = "https://i.imgur.com/on0rQlH.png" alt="wen2eat logo"></img>
          <h1>hey, are you wondering what to make & wen2eat?</h1>
        </div>
        <div className="Login-button-area">
          <div className="Links">
              <Link to="/login">
                  <button id = "Linkbutton">
                      Login
                  </button>
              </Link>



                {/* | {" "} */}
              {/* <Link to="/dr">Dietary Restrictions</Link> */}
          </div>            
        </div>
      </div>
      <div className="App-body">
        {/* <Outlet></Outlet> */}
        <Pantry items={ingredients} DietList={DietList} setDietList={setDietList} IntolerancesList={IntolerancesList} setIntolerancesList={setIntolerancesList}/>
        <Recs ingredients={ingredients} dietaryRestrictions={DietList} intolerances={IntolerancesList}></Recs>
      </div>
    </div>
  );
}

export default App;