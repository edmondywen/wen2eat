// Largely copied from Edmond's Pantry code

import { useState } from "react";
//import './Pantry.css'
import './DRList.css'
import DRItem from "./DRItem.js";
// import Ingredient from './Ingredient.js'

/*
DIETARY RESTRICTIONS 
displays a list of ingredients a user should avoid

props: 

states:
- items: an array of all of the items inside of the pantry 
*/


function DRList() {
    const [items, setItems] = useState([]);
    const [text, setText] = useState(""); // submit box
    return (
        <div className="DRList">
            <h1>Avoid</h1>

            {items.map((element, index) => {
                return (
                    <>
                        <div className="DRItem">
                            <DRItem itemName={element} />
                            <input type="checkbox" />
                            <button // delete button
                                onClick={() => {
                                    let newItems = [
                                        ...items.slice(0, index),
                                        ...items.slice(index + 1),
                                    ];
                                    setItems(newItems);
                                }}>
                                    x
                                </button>
                        </div>
                    </>
                )
            })} 

            <input
                id="submit-box"
                placeholder="ingredient"
                type="text"
                onChange={(event) => setText(event.target.value)} //event.target is what DOM element is being affected by the event. this is the input tag - grab the value of that
                value={text}
            ></input>

            {/*<button */}
            {/*    onClick={() => {*/}
            {/*        let newItems = items.slice().concat([text]);*/}
            {/*        setItems(newItems);*/}
            {/*        setText("");*/}
            {/*        console.log(items);*/}
            {/*    }}*/}
            {/*> */}
            {/*    Add ingredient to avoid*/}
            {/*</button>*/}

            <button
                id="submit-button"
                onClick={() => {
                    if (text === "") {
                        alert("add an ingredient");
                        return;
                    }
                    let newItems = items.slice().concat([[text]]);
                    setItems(newItems);
                    setText("");
                    console.log(items);
                    //setDate("");
                }}
            >
                Submit
            </button>

        </div>
    );
}

export default DRList;