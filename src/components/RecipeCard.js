import { useState } from "react";
import './RecipeCard.css'

/*
RECIPECARD 
displays a single recipe card 

props: 
title - title of recipe
description - description of the recipe

*/

function RecipeCard(props) {
    return (
        <div className="RecipeCard">
            <div className="Recipe-Image">
                <img 
                    src="https://www.jessicagavin.com/wp-content/uploads/2020/01/how-to-cook-bok-choy-10-1200.jpg"
                ></img>
            </div>
            <div className="Recipe-Description">
                <p className="Title"> {props.title} </p>      
                <p className="Description"> {props.description} </p>
            </div>
            <div className="Recipe-Fav-Select">
                <input
                    id="favorite-recipe"
                    placeholder="favorite"
                    type = "checkbox" 
                ></input>
            </div>
        </div>
    );
}

export default RecipeCard;