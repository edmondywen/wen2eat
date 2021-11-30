/*
props:
recs - recommendations state variable
updateRecs - to update state variable
*/

import { useState } from "react";
import RecipeCard from './RecipeCard.js'

function Recs({ingredients, data}) {
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

    function getAllRecipes() {
        // Receives all props from Recs
        return (recipe && recipe.map( (rec) => {
                return (<RecipeCard 
                    title={rec.title}
                    description={rec.summary} 
                    faved="your mom"
                />)
            }
        )
        );
    }

    return(
        <div className="Recs">
            <h1>Recommendations</h1>
            <button onClick={() => getRecipe(0)}>Get Recepies! 🥧</button>
            {getAllRecipes()}
        </div>   
    );
}

export default Recs;