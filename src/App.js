//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import IngredientForm from "./components/IngredientForm"
import { useEffect, useState } from "react"
import {query, limit, orderBy, getDocs, onSnapshot, collection, setDoc, doc, addDoc, getDoc, deleteDoc} from "@firebase/firestore"
import db from './firebase'
import RecipeCard from "./components/RecipeCard"

function App() {
  const [ingredients, setIngredients] = useState([])

  const [next, setNext] = useState(
    {
      ingredient: "",
      expiration: "",
    }
  )

  const [recipe, setRecipe] = useState([])
  const setupFirestoreListener = () => {
    console.log(db);
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

  async function getDate(docRef) 
  {
    const docSnapshot = await getDoc(docRef);
    const data = docSnapshot.data() 
    if(docSnapshot.exists())
    {
      let ingredient = data.ingredient; 
      let expiration = data.expiration.toDate(); 
      console.log(ingredient + " will expire on " + expiration); 
      let daystilexpiration = (expiration.getTime() - Date.now()) / (8.64 * Math.pow(10, 7)); 
      console.log("That's " + daystilexpiration + " days from now"); 
    }
  }


  async function sortByDate(collectionRef)
  //not working yet
  {
    const ordered = query(collectionRef, orderBy("ingredients", "desc"));

    const querySnapshot = await getDocs(ordered);
    if (querySnapshot.empty) 
    {
      console.log('no documents found');
    } 
  else
  {
    querySnapshot.forEach((doc) => {
      console.log("aosdhfbasdkhf" + doc.data().ingredient + " " + doc.data().expiration);
    }); }
    //console.log(ordered); 
    console.log("asldfbasfd")
  }

  function getRecipe()
  {
    let ingredientString = ""
    ingredients.forEach((ingredient) => ingredientString = ingredientString + "," +ingredient.ingredient)
    console.log(ingredientString)
    fetch(
      /* TODO
      make the spoonacular quiery depend on quantity and expiration*/
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=f87bfe3073584580bd8a6fb6eafa20f8&number=5&ingredients=${ingredientString}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setRecipe(data)
        console.log(recipe)
      })
      .catch(() => {
        console.log("error");
      });
      // recipe.forEach((rec) => console.log(rec.title))
  }

  return (
    <div className="body">
      <h1>Wen2Eat</h1>
      <IngredientForm onSubmit={handleSubmit} ingChange={handleIngChange} expChange={handleExpChange} current_expiration={next.expiration} current_ingredient={next.ingredient}/>
      <button onClick={clearAll}>Clear</button>

      {/* <button onClick={() => getDate(doc(db, "ingredients", "someid"))}>get date </button>  */}
      <button onClick={() => sortByDate(collection(db, "ingredients" ))}>Order database by expiration date</button> 

      <button onClick={getRecipe}>wat to eat</button>
      <button onClick={()=>(setRecipe([]))}>clear recipes</button>

      {ingredients.map((entry) => (
        //TODO
        /*make ingredients display function. Make it so that 
        expiration displays properly*/
        <div>
          <h5>{entry.ingredient}</h5>
          <h6>{entry.expiration.toString()}</h6>
        </div>
      ))}

      {recipe.map((entry) => (
        <div><RecipeCard recipe={entry}/></div>
      ))}
      
    </div>
  );
}

export default App;
