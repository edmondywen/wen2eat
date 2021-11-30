import React from 'react'
import { useState, useEffect } from "react"

const RecipeCard = ({recipe}) => {
    const [fullRecipe, setFullRecipe] = useState({sourceUrl:""})

    function getRecipeLink() 
    {
        fetch(
            `https://api.spoonacular.com/recipes/716429/information?apiKey=f87bfe3073584580bd8a6fb6eafa20f8&id=${recipe.id}`
        ).then((response) => response.json())
        .then((fetchedFullRecipe) => {
          setFullRecipe(fetchedFullRecipe)
        })
        .catch(() => {
          console.log("error");
        });
    }
    useEffect(getRecipeLink,[])

    const includes_ingredient = (recepie, ingredient) => (recepie.name.includes(ingredient) || recepie.nameClean.includes(ingredient) || recepie.original.includes(ingredient) || recepie.originalString.includes(ingredient) || recepie.originalName.includes(ingredient))

    
    return (
        <div>
            <h3>{recipe.title}</h3>
            <h5>Ingredients You Have:</h5>
            <ul>
                {recipe.usedIngredients.map( (ingredient) =>(
                    <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                )
                )}
            </ul>
            <h5>Ingredients You Don't Have:</h5>
            <ul>
                {recipe.missedIngredients.map( (ingredient) =>(
                    <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                )
                )}
            </ul>
            <a href={fullRecipe.sourceUrl}>Go To Recipe</a>
        </div>
    )
}

export default RecipeCard
