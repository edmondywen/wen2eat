import React from 'react'
import { useState, useEffect } from "react"

<<<<<<< HEAD:src/components/RecepieCard.js
const RecepieCard = ({recepie}) => {
    // const [fullRecepie, setFullRecepie] = useState({sourceUrl:""})

    
    // function getRecepieLink() 
    // {
    //     fetch(
    //         `https://api.spoonacular.com/recipes/716429/information?apiKey=f87bfe3073584580bd8a6fb6eafa20f8&id=${recepie.id}`
    //     ).then((response) => response.json())
    //     .then((fetchedFullRecepie) => {
    //       setFullRecepie(fetchedFullRecepie)
    //     })
    //     .catch(() => {
    //       console.log("error");
    //     });
    // }
    // useEffect(getRecepieLink,[])
=======
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
>>>>>>> 0fed98a7088ce033c93b21b594d8da30cc67f6e4:src/components/RecipeCard.js

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
<<<<<<< HEAD:src/components/RecepieCard.js
            <a href={recepie.sourceUrl}>Go To Recepie</a>
            <br />
            <img src={recepie.image}></img>
=======
            <a href={fullRecipe.sourceUrl}>Go To Recipe</a>
>>>>>>> 0fed98a7088ce033c93b21b594d8da30cc67f6e4:src/components/RecipeCard.js
        </div>
    )
}

export default RecipeCard
