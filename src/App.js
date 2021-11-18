//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import IngredientForm from "./components/IngredientForm"
import { useEffect, useState } from "react"
import { query, limit, orderBy, getDocs, onSnapshot, collection, setDoc, doc, addDoc, getDoc, deleteDoc} from "@firebase/firestore"
import db from './firebase'

function onSubmit(username, password)
{
  console.log("submitted something"); 
}

function App() {
  const[username, setUsername] = useState("some user"); 

  useEffect(() => {
    console.log("username updated"); 
  }); 

  return (
    <div className="body">
      <h1>Wen2Eat</h1>

      <p>Hello, {username}!</p>
      {/* <button onClick={() => setUsername('Player 1')}>
        Click me to set a username
      </button> */}


      <form onSubmit={onSubmit}>
          <label>Username:</label><br/>
          {/* onChange updates username every time the user enters/deletes a character  */}
          <input type="text" name="username" onChange={event => setUsername(event.target.value)}/><br/> 
          <input type="submit" value="Submit"  />
      </form>
      
    </div>
  );
}

export default App;
