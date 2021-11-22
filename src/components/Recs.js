/*
props:
recs - recommendations state variable
updateRecs - to update state variable
*/

import { useState } from "react";
import RecipeCard from './RecipeCard.js'

function Recs(props) {
    /*
        Need function to somehow get recommendations from database
        Recommendations will be an array with each element having the structure
        {id:, recipe that is [recipe data structure]}
        where [recipe data structure] = {title:, description:, image:, faved:,}
    */

    function getAllRecipes(data) {
        // Receives all props from Recs
        return (data.map( (datum) => {
                return (<RecipeCard 
                    title={datum.recipe.title}
                    description={datum.recipe.description} 
                    faved={datum.recipe.faved}
                />)
            }
        )
        );
    }

    return(
        <div className="Recs">
            <h1>Recommendations</h1>
            <p> epic recommendations here </p>
            <p> wow this is so cool </p>
            <p> epic poggers and based </p>
            {getAllRecipes(props.data)}
        </div>   
    );
}

export default Recs;