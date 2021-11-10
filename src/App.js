//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import IngredientForm from "./components/IngredientForm"
import { useEffect, useState } from "react"
import { onSnapshot, collection, setDoc, doc, addDoc, getDoc, deleteDoc, Timestamp } from "@firebase/firestore"
import db from './firebase'
import RecepieCard from "./components/RecepieCard"

function App() {
  const [ingredients, setIngredients] = useState([])

  const [next, setNext] = useState(
    {
      ingredient: "",
      expiration: "",
    }
  )

  const [recepie, setRecepie] = useState([])

  const setupFirestoreListener = () => {
    console.log(db);
    // getRecepie();
    return onSnapshot(collection(db, "ingredients"), (snapshot) => 
      setIngredients(snapshot.docs.map((doc) => (
        {ingredient: doc.data().ingredient, expiration: (doc.data().expiration === undefined) ? "" : doc.data().expiration.toDate(), id: doc.id}
        ))
    ))
  }
  useEffect(setupFirestoreListener, []);
  

  function handleIngChange(event){
    setNext({...next, ingredient: event.target.value})
  }

  function handleExpChange(date){
    setNext({...next, expiration: date})
  }

  function handleSubmit(event){
    event.preventDefault()
    addIngredient(next)
    setNext({ingredient: "", expiration: "",})
  }

  async function addIngredient(ingredient)
  {
    const collectionRef = collection(db, 'ingredients')
    if(!(ingredients.expiration instanceof Date))
    {
      delete ingredient.expiration
    }
    await addDoc(collectionRef, ingredient)
  }

  function clearAll()
  {
    ingredients.forEach(
      async (result) => {
        const docRef = doc(db, "ingredients", result.id)
        await deleteDoc(docRef)
      }
    )
  }

  function getRecepie()
  {
    let ingredientString = ""
    ingredients.forEach((ingredient) => ingredientString = ingredientString + "," +ingredient.ingredient)
    console.log(ingredientString)
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=f87bfe3073584580bd8a6fb6eafa20f8&number=5&ingredients=${ingredientString}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setRecepie(data)
        console.log(recepie)
      })
      .catch(() => {
        console.log("error");
      });
      // recepie.forEach((rec) => console.log(rec.title))
  }

  return (
    <div className="body">
      <h1>Wen2Eat</h1>
      <IngredientForm onSubmit={handleSubmit} ingChange={handleIngChange} expChange={handleExpChange} current_expiration={next.expiration} current_ingredient={next.ingredient}/>
      <button onClick={clearAll}>Clear</button>
      <button onClick={getRecepie}>wat to eat</button>

      {ingredients.map((entry) => (
        <div>
          <h5>{entry.ingredient}</h5>
          <h6>{entry.expiration.toString()}</h6>
        </div>
      ))}

      {recepie.map((entry) => (
        <div><RecepieCard recepie={entry}/></div>
      ))}
      
    </div>
  );
}

export default App;
