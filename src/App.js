import IngredientForm from "./components/IngredientForm"
import { useEffect, useState } from "react"
import { onSnapshot, collection } from "@firebase/firestore"
import db from './firebase'

function App() {
  const [ingredients, setIngredients] = useState([
    {
      ingredient: "hello",
      expiration: "there",
    },
    {
      ingredient: "you",
      expiration: "moo",
    },
  ])

  const setupFirestoreListener = () => {
    return onSnapshot(collection(db, 'ingredients'), (snapshot) =>
    setIngredients(snapshot.docs.map((doc) => doc.data())))
  }
  useEffect(setupFirestoreListener, []);


  const [next, setNext] = useState(
    {
      ingredient: "",
      expiration: "",
    }
  )

  function handleIngChange(event){
    setNext({...next, ingredient: event.target.value})
  }

  function handleExpChange(event){
    setNext({...next, expiration: event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault()
    const newIngs = [...ingredients]
    newIngs.push({ingredient: next.ingredient, expiration: next.expiration})
    setIngredients(newIngs)
    setNext({ingredient: "", expiration: "",})
  }

  return (
    <div className="body">
      <h1>Wen2Eat </h1>
      <IngredientForm onSubmit={handleSubmit} ingChange={handleIngChange} expChange={handleExpChange}/>
      {ingredients.map((entry) => (
        <div>
          <h5>{entry.ingredient}</h5>
          <h6>{entry.expiration}</h6>
        </div>
      ))}
    </div>
  );
}

export default App;
