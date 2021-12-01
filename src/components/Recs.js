/*
props:
recs - recommendations state variable
updateRecs - to update state variable
*/

import { useState } from "react";
import RecipeCard from './RecipeCard.js'
import "./Recs.css"
import {userCollectionID} from "./Login.js"
import { collection, addDoc, getDocs } from "@firebase/firestore"
import db from '../firebase'

function Recs({ingredients, dietaryRestrictions, intolerances}) {
  let collectionName = userCollectionID.substring(0, userCollectionID.length - 11) + "_favorites";
    const [recipe, setRecipe] = useState([])
    const APIKEY = ['f5c4a28754c8421a87b7caae4e66f5b8', 'f87bfe3073584580bd8a6fb6eafa20f8', '172c8e43ebeb4f848f87dae833c0165d', '1d37f991a41c4cb4b722cac38d7173b2', '036df255673a40a8a6cf357fe0bcbfe2', 'a09e68c0e447408cbc7a44c8b3ad0884']
    /*
        Need function to somehow get recommendations from database
        Recommendations will be an array with each element having the structure
        {id:, recipe that is [recipe data structure]}
        where [recipe data structure] = {title:, description:, image:, faved:,}
    */
   const getRecipe = (key) => 
   {
    let ingredientString = ""
    ingredients.forEach((ingredient) => ingredientString = ingredientString + "," +ingredient.ingredient)
    ingredientString = encodeURIComponent(ingredientString)
    let dietString = dietaryRestrictions;
    // dietaryRestrictions.forEach((diet) => dietString = dietString + "diet=" + encodeURIComponent(diet) + '&')
    // console.log("DIETS:")
    // console.log(dietString)
    let intoleranceString = ""
    intolerances.forEach((intolerance) => intoleranceString = intoleranceString + "," + intolerance)

    fetch(
         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY[key]}&includeIngredients=${ingredientString}&intolerances=${intoleranceString}&diet=${dietString}&sort=min-missing-ingredients&addRecipeInformation=true&fillIngredients=true`
        )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if(data.status === 'failure')
        {
            if(key = APIKEY.length-1)
            {
            console.log("error")
            }else
            {
            getRecipe(key+1)
            }
            return
        }
        setRecipe(data.results)
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
   }
  
   async function pushFavorite(recipe_id)
   {
     //Push the favorite to the collection 
     console.log("Name of favorites collection is " + collectionName)
     const collectionRef = collection(db, collectionName); 
     await addDoc(collectionRef, {
      id: recipe_id
      })
   }
   async function deleteFavorite(recipe_id)
   {

   }

   async function showFavorites()
   {
    const querySnapshot = await getDocs(collection(db,collectionName)); 
    let len = querySnapshot.size
    let favorites = []
    for (let i = 0; i < len; i++)
    {
        //console.log(querySnapshot.docs[i].data().id)
        favorites.push(querySnapshot.docs[i].data().id)
    }
    console.log(favorites)
    return favorites; 

   }
    function getAllRecipes() {
        // Receives all props from Recs
        return (recipe && recipe.map( (rec) => {   
          console.log(rec);
          let summary = rec.summary.replace( /(<([^>]+)>)/ig, '');
          let index = summary.indexOf("All things considered, we decided this recipe deserves a spoonacular score");
          summary = summary.slice(0, index); //remove a weird spoonacular score section in the description 
          return (<RecipeCard 
            title={rec.title}
            description={summary} 
            image={rec.image}
            link={rec.sourceUrl}
            faved="your mom"
            id={rec.id}
            addFavorite={pushFavorite}
        />)
        }));
    }

    return(
        <div className="Recs">
            <h1>Recommendations</h1>
            {/* TODO: wrap this in a div so that I can arrange the layout of the buttons or I could add margin. make buttons the same size */}
            <button className = "recs-button" onClick={() => getRecipe(2)}>Get Recepies! 🥧</button>
            <button className = "recs-button" onClick={() => showFavorites()}> Show Favorites ★</button>
            {getAllRecipes()}
        </div>   
    );
}

export default Recs;