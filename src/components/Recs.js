/*
props:
recs - recommendations state variable
updateRecs - to update state variable
*/

import { useEffect, useState } from "react";
import RecipeCard from './RecipeCard.js'
import "./Recs.css"
import {userCollectionID} from "./Login.js"
import { collection, addDoc, getDocs, query, where, deleteDoc, onSnapshot } from "@firebase/firestore"
import db from '../firebase'

function Recs({ingredients, dietaryRestrictions, intolerances}) {
  let collectionName = userCollectionID.substring(0, userCollectionID.length - 11) + "_favorites";
    const [recipe, setRecipe] = useState([]);
    const [favoriteIDs, setFavoriteIDs] = useState([]);
    const APIKEY = ['f5c4a28754c8421a87b7caae4e66f5b8', 'f87bfe3073584580bd8a6fb6eafa20f8', '172c8e43ebeb4f848f87dae833c0165d', '1d37f991a41c4cb4b722cac38d7173b2', '036df255673a40a8a6cf357fe0bcbfe2', 'a09e68c0e447408cbc7a44c8b3ad0884', 'dd90b98918d5434ebe78168613318483', 'c23ad133748d40dfb83f32f6422023cc', '7312fa0da4e846c1a3002cd318730097', 'cd728c48cad14e159d69c2ae2d9bfc87']
    const [currentKey, setCurrentKey] = useState(0)
    const [page, setPage] = useState(0)
    const [favs, setFavs] = useState([])

    const setupFirestoreListener = () => {
      console.log(db);
      return onSnapshot(collection(db, collectionName), (snapshot) => 
        setFavs(snapshot.docs.map((doc) => (doc.data().id))))
    }
    useEffect(setupFirestoreListener, []);
    
    /*
        Need function to somehow get recommendations from database
        Recommendations will be an array with each element having the structure
        {id:, recipe that is [recipe data structure]}
        where [recipe data structure] = {title:, description:, image:, faved:,}
    */
  const getRecipe = (key) => {
    // console.log("key")
    // console.log(key)
    let ingredientString = ""
    ingredients.forEach((ingredient) => ingredientString = ingredientString + "," +ingredient.ingredient)
    ingredientString = encodeURIComponent(ingredientString)
    let dietString = dietaryRestrictions;
    // dietaryRestrictions.forEach((diet) => dietString = dietString + "diet=" + encodeURIComponent(diet) + '&')
    // console.log("DIETS:")
    // console.log(dietString)
    let intoleranceString = ""
    intolerances.forEach((intolerance) => intoleranceString = intoleranceString + "," + intolerance)
    console.log(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY[key]}&includeIngredients=${ingredientString}&intolerances=${intoleranceString}&offset=${10*page}&sort=min-missing-ingredients&addRecipeInformation=true&fillIngredients=true`)
    fetch(
         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY[key]}&includeIngredients=${ingredientString}&intolerances=${intoleranceString}&diet=${dietString}&offset=${10*page}&sort=min-missing-ingredients&addRecipeInformation=true&fillIngredients=true`
        )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.status === 'failure')
        {
            if(key === APIKEY.length-1)
            {
            console.log(APIKEY.length)
            console.log("this error")
            }else
            {
            setCurrentKey(key+1)
            getRecipe(key+1)
            }
            return
        }
        setRecipe(data.results)
      })
      .catch(() => {
        if(key === APIKEY.length-1)
        {
          console.log("error")
        }else
        {
          getRecipe(key+1)
        }
      });
  }
  
   async function pushFavorite(recipe_id)
   {
     if(favs.includes(recipe_id))
     {
       return
     }
    const collectionRef = collection(db, collectionName); 
    await addDoc(collectionRef, {
    id: recipe_id
    })
   }

   async function deleteFavorite(recipe_id)
   {
    const q = query(collection(db, collectionName), where("id", "==", recipe_id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      deleteDoc(doc.ref)
    });
   }

   async function toggleFav(id)
   {
      if(favs.includes(id))
      {
        await deleteFavorite(id)
      }else
      {
        await pushFavorite(id)
      }
   }

    function getAllRecipes() {
        // Receives all props from Recs
        return (recipe && recipe.map( (rec) => {   
          //console.log(rec);
          let summary = rec.summary.replace( /(<([^>]+)>)/ig, '');
          let index = summary.indexOf("All things considered, we decided this recipe deserves a spoonacular score");
          summary = summary.slice(0, index); //remove a weird spoonacular score section in the description 
          console.log("favs")
          console.log(favs)
          return (<RecipeCard 
            toggleFav={toggleFav}
            favs={favs}
            title={rec.title}
            description={summary} 
            image={rec.image}
            link={rec.sourceUrl}
            id={rec.id}
            addFavorite={pushFavorite}
        />)
        }));
    }


    function getRecipeByID(key) //used for finding favorited recipes
    {
      if(favs.length ===0)
      {
        setRecipe([])
        return
      }
      let idsString = ""
      favs.forEach((id) => (idsString = idsString + id + ','))
      console.log(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${APIKEY[key]}&ids=${idsString}`)
        fetch(
           `https://api.spoonacular.com/recipes/informationBulk?apiKey=${APIKEY[key]}&ids=${idsString}`
        )
      .then((response) => (response.json()))
      .then((data) => {
        console.log("with data")
        console.log(data)
        if(data.status === 'failure')
        {
            if(key === APIKEY.length-1)
            {
              console.log("error, status is failure")
            }else
            {
              setCurrentKey(key+1)
              getRecipeByID(key+1)
            }
            return
        }
        
        setRecipe(data)

      })
      .catch(() => {
        if(key === APIKEY.length-1)
        {
          console.log("error, reached end of keys")
        }else
        {
          getRecipeByID(key+1)
        }
      });
    }

    return(
        <div className="Recs">
            <h1>Recommendations</h1>
            {/* TODO: wrap this in a div so that I can arrange the layout of the buttons or I could add margin. make buttons the same size */}
            <button className = "recs-button" onClick={() => getRecipe(currentKey)}>Get Recepies! 🥧</button>

            <button className = "recs-button" onClick={() => getRecipeByID(currentKey)}> Show Favorites ★</button>
            {getAllRecipes()}
            {(page !== 0 ) ? <button className = "recs-button" onClick={()=>{setPage(page-1);getRecipe(currentKey)}}> Back </button> : null}
            {(recipe.length === 10 && page < 90) ? <button className = "recs-button" onClick={()=>{setPage(page+1);getRecipe(currentKey)}}> Next </button> : null}
            
        </div>   
    );
}

export default Recs;