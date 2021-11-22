import { useState } from "react";
import './RecipeCard.css'

/*
RECIPECARD 
displays a single recipe card 

props: 
title - title of recipe
description - description

*/

function RecipeCard(props) {
    return (
        <div className="RecipeCard">
            <h1 className="Title"> {props.title} </h1>            
            <p className="Description"> {props.description} </p>
            <input
                id="favorite-recipe"
                placeholder="favorite"
                type = "text" 
            ></input>
        </div>
    );
}

export default RecipeCard;