import {useState} from "react";
import { Outlet, Link } from "react-router-dom";
import './Links.css'
import './DRList.css'
import './Links.css'
import DRItem from "./DRItem";

function DietaryRestrictions(){
    const [items, setItems] = useState([]);
    const [text, setText] = useState(""); // submit box
    return(
        <div className="DR">
            <h1>Dietary Restrictions :)</h1>
            <div className="Links">
                <Link to="/pantry">Pantry</Link> | {" "}
                <Link to="/dr">Dietary Restrictions</Link>
            </div>

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
    )
}

export default DietaryRestrictions;