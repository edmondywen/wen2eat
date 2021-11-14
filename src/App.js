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

<<<<<<< HEAD
  const [recepie, setRecepie] = useState([])

=======
  const [recipe, setRecipe] = useState([])
>>>>>>> 0fed98a7088ce033c93b21b594d8da30cc67f6e4
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
    // console.log(next.expiration)
    addIngredient(next)
    setNext({ingredient: "", expiration: "",})
  }

  async function addIngredient(ingredient)
  {
    const collectionRef = collection(db, 'ingredients')
    if(!(ingredient.expiration instanceof Date))
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
      // `https://api.spoonacular.com/recipes/findByIngredients?apiKey=f87bfe3073584580bd8a6fb6eafa20f8&number=5&ingredients=${ingredientString}`
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=f87bfe3073584580bd8a6fb6eafa20f8&includeIngredients=${ingredientString}&sort=max-used-ingredients&addRecipeInformation=true&fillIngredients=true`
      )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
<<<<<<< HEAD
        setRecepie(data.results)
        console.log(recepie)
=======
        setRecipe(data)
        console.log(recipe)
>>>>>>> 0fed98a7088ce033c93b21b594d8da30cc67f6e4
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

<<<<<<< HEAD
      <button onClick={getRecepie}>wat to eat</button>
      <button onClick={()=>(setRecepie([]))}>clear recepies</button>
=======
      <button onClick={getRecipe}>wat to eat</button>
      <button onClick={()=>(setRecipe([]))}>clear recipes</button>
>>>>>>> 0fed98a7088ce033c93b21b594d8da30cc67f6e4

      {ingredients.map((entry) => (
        //TODO
        /*make ingredients display function. Make it so that 
        expiration displays properly*/
        <div>
          <h5>{entry.ingredient}</h5>
          <h6>{entry.expiration.toLocaleString().substring(0,10)}</h6>
        </div>
      ))}

<<<<<<< HEAD
      {recepie.map((entry) => (
        // <div>{entry.title} {entry.ingredients}</div>
        <div><RecepieCard recepie={entry}/></div>
=======
      {recipe.map((entry) => (
        <div><RecipeCard recipe={entry}/></div>
>>>>>>> 0fed98a7088ce033c93b21b594d8da30cc67f6e4
      ))}
      
    </div>
  );
}

export default App;
