import { useState } from "react";
import './Pantry.css'
import Ingredient from './Ingredient.js'

/*
PANTRY 
displays a list of the ingredients a user has available to them

props: 

states:
- items: an array of all of the items inside of the pantry 
*/

function Pantry() {
    const [items, setItems] = useState([]);
    const [text, setText] = useState("");
    return (
        <div className="Pantry">
            {items.map((element, index) => {
                return (
                    <div className="Pantry-Item">
                        <Ingredient itemName = {element}/>
                        <input type="checkbox"/>
                        <button 
                        onClick = {() => {
                            let newItems = [
                                ...items.slice(0,index),
                                ...items.slice(index + 1),
                            ];
                            setItems(newItems);
                        }}>
                            x
                        </button>
                    </div>
                )
            })} 

            <input 
                id="submit-box"
                placeholder="ingredient"
                type = "text" 
                onChange = {(event) => setText(event.target.value)} //event.target is what DOM element is being affected by the event. this is the input tag - grab the value of that
                value = {text}
            ></input>
            <input
                placeholder="expiration date"
            ></input>

            <button
                id="submit-button"
                onClick={() => {
                    if (text == ""){
                        alert("add an ingredient");
                        return;
                    }
                    let newItems = items.slice().concat([text]);
                    setItems(newItems);
                    setText("");
                    console.log(items);
                }}
            > 
                Submit 
            </button>
        </div>
    );
}

export default Pantry;