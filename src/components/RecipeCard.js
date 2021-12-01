import { useState } from "react";
import './RecipeCard.css'

/*
RECIPECARD 
displays a single recipe card 

props: 
title - title of recipe
description - description of the recipe
image - url to a picture of the dish 
link - link to the recipe itself
isChecked - bool to see if the checkbox should be checked or not 
*/

function RecipeCard(props) {
    return (
        <div className="RecipeCard">
            <div className="Recipe-Image">
                <img 
                    src={props.image}
                ></img>
            </div>
            <div className="Recipe-Description">
                <p className="Title"> {props.title} |  <a href = {props.link} target='_blank'>recipe</a></p>   
                <p className="Description"> {props.description} </p>
            </div>
            <div className="Recipe-Fav-Select">
                <input onClick = {() => props.toggleFav(props.id)}
                    class="star"
                    id={props.id}
                    value={props.favs.includes(props.id)}
                    placeholder="favorite"
                    type = "checkbox"
                    // checked = {props.isChecked} 
                ></input>
            </div>
        </div>
    );
}

export default RecipeCard;