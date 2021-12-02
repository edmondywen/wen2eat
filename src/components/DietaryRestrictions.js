import {useState} from "react";
import { Link } from "react-router-dom";
import './Links.css'
import './DRList.css'
import DRItem from "./DRItem";

function DietaryRestrictions({onFlip, DietSet, IntolerancesSet, DietList, IntolerancesList}){

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
                <div className="Checkboxes">
                    {/* <input type="radio" id={props.id} name={props.name} value={props.value} checked={isChecked} 
                    onChange={ () => {
                        props.changeFunction(props.id, isChecked);
                        changeChecked(!isChecked); 
                    } }/> */}
                    <form>
                        {diet_options.map((option) => {
                            return(
                                <div>
                                    <input type="radio" id={option} name="diet" onClick={() => (DietList !== option) ? DietSet(option) : DietSet("")} checked={DietList === option}/>
                                    <label for={option}>{option}</label>
                                </div>
                            )
                        })}
                    </form>
                </div>
                <p></p>
            </div>


            <div className="Intolerances">
                <h3>Intolerances</h3>
                <div className="Checkboxes">
                    {intolerance_options.map((option) => {
                        return(
                            <DRItem id={option} name={option} value ={option} changeFunction={IntolerancesSet} isChecked={IntolerancesList.includes(option)} />
                        )
                    })}
                </div>
                    <p></p>
            </div>
        </div>
    )
}

export default DietaryRestrictions;