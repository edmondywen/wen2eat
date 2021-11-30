//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import IngredientForm from "./components/IngredientForm"
import { useEffect, useState } from "react"
import { query, limit, orderBy, getDocs, onSnapshot, collection, setDoc, doc, addDoc, getDoc, deleteDoc} from "@firebase/firestore"
import db from './firebase'
import RecipeCard from "./components/RecipeCard"


function App() {
  const APIKEY = ['f5c4a28754c8421a87b7caae4e66f5b8', 'f87bfe3073584580bd8a6fb6eafa20f8', '172c8e43ebeb4f848f87dae833c0165d', '1d37f991a41c4cb4b722cac38d7173b2', '036df255673a40a8a6cf357fe0bcbfe2', 'a09e68c0e447408cbc7a44c8b3ad0884']
  const RECIPES_PER_PAGE = 10
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

  function compare(a, b)
  {
    return a.expiration - b.expiration; 
  }

  async function getSortedIngredients()
  {
    let ingredients = []; 
    const querySnapshot = await getDocs(collection(db, "ingredients"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      let ingredientobject = { 
        ingredient: doc.data().ingredient, 
        expiration: doc.data().expiration
      }
      ingredients.push(ingredientobject); 
      console.log("Pushed " + ingredientobject.ingredient + " with expiration of " + ingredientobject.expiration); 
    });

    ingredients.sort(compare); 
    console.log(ingredients); 

    return ingredients; 
  }

  async function getRecipe(key)
  {
    let ingredientString = ""
    console.log("1")
    console.log(ingredients)
    //TODO
    // escape spaces and special chars in ingredient names
    ingredients.forEach((ingredient) => ingredientString = ingredientString + "," +ingredient.ingredient)
    ingredientString = '+' + encodeURIComponent(ingredientString)
    console.log(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY[key]}&includeIngredients=${ingredientString}&diet=vegetarian&sort=min-missing-ingredients&addRecipeInformation=true&fillIngredients=true`)
    fetch(
      /* TODO
      make the spoonacular quiery depend on quantity and expiration*/
      // `https://api.spoonacular.com/recipes/findByIngredients?apiKey=f87bfe3073584580bd8a6fb6eafa20f8&number=5&ingredients=${ingredientString}`
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY[key]}&includeIngredients=${ingredientString}&diet=vegetarian&sort=min-missing-ingredients&addRecipeInformation=true&fillIngredients=true`
        )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results)
        setRecipe(data.results)
        // console.log(recipe)
      })
      .catch(() => {
        if(key = APIKEY.length-1)
        {
          console.log("error")
        }else
        {
          getRecipe(key+1)
        }
      });
      console.log("2")
    console.log(recipe)
      // recipe.forEach((rec) => console.log(rec.title))
  }

  function getIngredientScore()
  {
    const ingredient_weights = {}
    const current_date = Date.now()
    ingredients.forEach((ing) => {
      let daysUntilExp = 180
      if(ing.expiration !== "")
      {
        daysUntilExp = (ing.expiration.getTime() - current_date) / (1000*3600*24)
      }
      const score = (daysUntilExp >= 1) ? 1/Math.log(daysUntilExp+.5) : 0
      ingredient_weights[ing.ingredient] = score
    })
    return ingredient_weights
  }

  function insertRecipes(rec, sorted)
  {
    const half = parseInt(sorted.length/2)
    if(sorted.length === 0)
    {
      sorted.push(rec)
      return sorted
    }else if(sorted.length === 1)
    {
      if(parseFloat(rec.score) > parseFloat(sorted[0].score))
      {
        sorted.push(rec)
        return sorted
      }else
      {
        let recArray = [rec]
        return recArray.concat(sorted)
      }
    }else if(parseFloat(rec.score) > parseFloat(sorted[half].score))
    {
      // alert("called gt")
      return sorted.slice(0,half).concat(insertRecipes(rec, sorted.slice(half)))
    }else
    {
      return insertRecipes(rec, sorted.slice(0, half)).concat(sorted.slice(half))
    }
  }

  const includes_ingredient = (recepie, ingredient) => (recepie.name.includes(ingredient) || recepie.nameClean.includes(ingredient) || recepie.original.includes(ingredient) || recepie.originalString.includes(ingredient) || recepie.originalName.includes(ingredient))

  function sortRecipes(unorderedRecipes)
  {
    const ingredient_weights = getIngredientScore()
    let orderedRecipeEncodings = []
    unorderedRecipes.forEach((recipe, index) => {
      const recepie_incoding = {position: index, score: 0}
      ingredients.forEach((in_pantry) => {
        recipe.extendedIngredients.forEach((in_recepie) => {
          if(includes_ingredient(in_recepie, in_pantry.ingredient))
          {
            recepie_incoding["score"] += ingredient_weights[in_pantry.ingredient]
          }
        })
      })
      orderedRecipeEncodings = insertRecipes(recepie_incoding, orderedRecipeEncodings)
    })
    let orderedRecipes = RECIPES_PER_PAGE < orderedRecipeEncodings.length ? new Array(RECIPES_PER_PAGE) : new Array(orderedRecipeEncodings.length)
    for(let i = 0; i < RECIPES_PER_PAGE && i < orderedRecipeEncodings.length; i++)
    {
      orderedRecipes[i] = unorderedRecipes[orderedRecipeEncodings[i]["position"]]
    }
    setRecipe(orderedRecipes)
  }

  return (
    <div className="body">
      <h1>Wen2Eat</h1>
      <IngredientForm onSubmit={handleSubmit} ingChange={handleIngChange} expChange={handleExpChange} current_expiration={next.expiration} current_ingredient={next.ingredient}/>
      <button onClick={clearAll}>Clear</button>

      {/* <button onClick={() => getDate(doc(db, "ingredients", "someid"))}>get date </button>  */}
      <button onClick={() => getSortedIngredients()}>Order database by expiration date</button> 
      <button onClick={() => (getRecipe(0))}>wat to eat</button>
      <button onClick={()=>(setRecipe([]))}>clear recipes</button>
      <button onClick={()=>(sortRecipes(recipe))}>sort recipes</button>
      {ingredients.length > 0 && ingredients.map((entry) => (
          <div>
            <h5>{entry.ingredient}</h5>
            <h6>{entry.expiration.toLocaleString().substring(0,10)}</h6>
          </div>
        ))
      }

      {recipe && recipe.map((entry) => (
        <div><RecipeCard recipe={entry}/></div>
      ))}
      
    </div>
  );
}

export default App;
