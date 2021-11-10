import React from 'react'
import { useState, useEffect } from "react"

const RecepieCard = ({recepie}) => {
    const [fullRecepie, setFullRecepie] = useState({sourceUrl:""})

    function getRecepieLink() 
    {
        fetch(
            `https://api.spoonacular.com/recipes/716429/information?apiKey=f87bfe3073584580bd8a6fb6eafa20f8&id=${recepie.id}`
        ).then((response) => response.json())
        .then((fetchedFullRecepie) => {
          setFullRecepie(fetchedFullRecepie)
        })
        .catch(() => {
          console.log("error");
        });
    }
    useEffect(getRecepieLink,[])

    return (
        <div>
            <h3>{recepie.title}</h3>
            <h5>Ingredients You Have:</h5>
            <ul>
                {recepie.usedIngredients.map( (ingredient) =>(
                    <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                )
                )}
            </ul>
            <h5>Ingredients You Don't Have:</h5>
            <ul>
                {recepie.missedIngredients.map( (ingredient) =>(
                    <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                )
                )}
            </ul>
            <a href={fullRecepie.sourceUrl}>Go To Recepie</a>
        </div>
    )
}

export default RecepieCard
