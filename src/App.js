//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import IngredientForm from "./components/IngredientForm"
import { useEffect, useState } from "react"
import { onSnapshot, collection, setDoc, doc, addDoc, getDoc, deleteDoc, Timestamp } from "@firebase/firestore"
import db from './firebase'

function App() {
  const [ingredients, setIngredients] = useState([])

  const setupFirestoreListener = () => {
    console.log(db);
    return onSnapshot(collection(db, "ingredients"), (snapshot) =>
    setIngredients(snapshot.docs.map((doc) => ({ingredient: doc.data().ingredient, expiration: doc.data().expiration.toDate(), id: doc.id}) )
    ))
  }
  useEffect(setupFirestoreListener, []);
  

  const [next, setNext] = useState(
    {
      ingredient: "",
      expiration: "",
    }
  )

  const [recepie, setRecepie] = useState(null)

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

  function getDate(docRef) 
  {
    //const docSnapshot = await getDoc(docRef); 
  }

  function getRecepie()
  {
    fetch(
      `GET https://api.spoonacular.com/recipes/complexSearch?apiKey=f87bfe3073584580bd8a6fb6eafa20f8&number=1&ingredients=bananas,cinnamon`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecepie(data);
      })
      .catch(() => {
        console.log("error");
      });
      console.log("recepie is "+{recepie})
  }

  return (
    <div className="body">
      <h1>Wen2Eat</h1>
      <IngredientForm onSubmit={handleSubmit} ingChange={handleIngChange} expChange={handleExpChange} current_expiration={next.expiration} current_ingredient={next.ingredient}/>
      <button onClick={clearAll}>Clear</button>
      <p>something blue</p>
      <button onClick={getRecepie}>wat to eat</button>
      <div>
        {recepie}
      </div>

      {ingredients.map((entry) => (
        <div>
          <h5>{entry.ingredient}</h5>
          <h6>{entry.expiration.toString()}</h6>
        </div>
      ))}
      
    </div>
  );
}

export default App;
