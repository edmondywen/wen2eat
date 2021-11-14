import { useState } from "react";
import './RecipeCard.css'

/*
RECIPE CARD 
Is the recipe card

Receives the following props:
title: name of recipe
description: description of recipe
image: 
alt: 

*/

function RecipeCard(props) {
    return (
        <div>
            <h1>
                props.title
            </h1>
            <p>
                props.description
            </p>
        </div>
    );
}

export default RecipeCard;