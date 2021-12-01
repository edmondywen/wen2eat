import {useState} from "react";
import { Link } from "react-router-dom";
import './Links.css'
import './DRList.css'
import DRItem from "./DRItem";

function DietaryRestrictions({onFlip, DietSet, IntolerancesSet}){
    const [items, setItems] = useState([]);
    const [text, setText] = useState(""); 


    let diet_options = ['gluten free', 'ketogenic', 'vegetarian', 'ovo-vegetarian', 'lacto-vegetarian', 'vegan',
                                'pescetarian', 'paleo', 'primal', 'low FODMAP', 'whole30'];
    let intolerance_options = ['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame',
                                'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'];
    return(
        <div className="DRList">
            <h1>Dietary Restrictions</h1>
            <div className="Links">
                <button onClick={onFlip} id = "Linkbutton">
                    Flip to Pantry
                </button>
            </div>

            <div className="Diet">
                <h3>Diet</h3>
                <DRItem id="Matthew ID" name="Matthew Name" value = "Matthew Value" changeFunction={DietSet} /> 
                {diet_options.map((option) => {
                    return(
                        <DRItem id={option} name={option} value ={option} changeFunction={DietSet} />
                    )
                })}
                <p></p>
            </div>


            <div className="Intolerances">
                <h3>Intolerances</h3>
                    {intolerance_options.map((option) => {
                        return(
                            <DRItem id={option} name={option} value ={option} changeFunction={IntolerancesSet} />
                        )
                    })}
                    <p></p>
            </div>
        </div>
    )
}

export default DietaryRestrictions;