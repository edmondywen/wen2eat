import {useState} from "react";
import { Outlet, Link } from "react-router-dom";
import './Links.css'
import './DRList.css'
import DRItem from "./DRItem";

function DietaryRestrictions(){
    const [items, setItems] = useState([]);
    const [text, setText] = useState(""); // submit box
    const [DietList, setDietList] = useState([]);
    const [IntolerancesList, setIntolerancesList] = useState([]);
    function DietSet(x, isAdded) {
        console.log("New iteration");
        console.log(isAdded);
        console.log(DietList);
        if (isAdded) {
            console.log("you are here");
            const newDietList = DietList.filter(DietItem => x !== DietItem);
            setDietList(newDietList);
        }
        else {
            let copyDietList = DietList.slice();
            copyDietList.push(x);
            setDietList(copyDietList);
        }
        console.log(DietList);
    }
    function IntolerancesSet(x, isAdded) {
        console.log("New iteration");
        console.log(isAdded);
        console.log(IntolerancesList);
        if (isAdded) {
            console.log("you are here");
            const newIntolerancesList = IntolerancesList.filter(IntoleranceItem => x !== IntoleranceItem);
            setIntolerancesList(newIntolerancesList);
        }
        else {
            let copyIntolerancesList = IntolerancesList.slice();
            copyIntolerancesList.push(x);
            setIntolerancesList(copyIntolerancesList);
        }
        console.log(IntolerancesList);
    }
    // pass {id, value, changeFunction, name, }
    // function getCheckbox(id, value, name, changeFunction) {
    //     return(
    //         <div>
    //             <input type="checkbox" id={id} name={name} value={value} 
    //                 // onChange={({ target }) => setDietList([...DietList, target.value])}
    //                 onChange={ ({id}) => changeFunction(id) }
    //             />
    //             <label for={id}>{value}</label>
    //         </div>
    //     )
    // }
    let target = {value: 'gluten free'};
    let diet_options = ['gluten free', 'ketogenic', 'vegetarian', 'ovo-vegetarian', 'lacto-vegetarian', 'vegan',
                                'pescetarian', 'paleo', 'primal', 'low FODMAP', 'whole30'];
    let intolerance_options = ['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame',
                                'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'];
    return(
        <div className="DRList">
            <h1>Dietary Restrictions</h1>
            <div className="Links">
                <Link to="/pantry">
                    <button id = "Linkbutton">
                        Flip to Pantry
                    </button>
                </Link>
                 {/* | {" "} */}
                {/* <Link to="/dr">Dietary Restrictions</Link> */}
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
                    {/* <div>
                        <input type="checkbox" id="dairy" name="intolerances" value="dairy"/>
                        <label for="dairy">Dairy</label>
                    </div>
                    <div>
                        <input type="checkbox" id="egg" name="intolerances" value="egg"/>
                        <label for="egg">Egg</label>
                    </div>
                    <div>
                        <input type="checkbox" id="gluten" name="intolerances" value="gluten"/>
                        <label for="gluten">Gluten</label>
                    </div>
                    <div>
                        <input type="checkbox" id="grain" name="intolerances" value="grain"/>
                        <label for="grain">Grain</label>
                    </div>
                    <div>
                        <input type="checkbox" id="Peanut" name="intolerances" value="lacto-vegetarian"/>
                        <label for="lacto-vegetarian">Peanut</label>
                    </div>
                    <div>
                        <input type="checkbox" id="seafood" name="intolerances" value="seafood"/>
                        <label for="seafood">Seafood</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sesame" name="intolerances" value="sesame"/>
                        <label for="sesame">Sesame</label>
                    </div>
                    <div>
                        <input type="checkbox" id="shellfish" name="intolerances" value="shellfish"/>
                        <label for="shellfish">Shellfish</label>
                    </div>
                    <div>
                        <input type="checkbox" id="soy" name="intolerances" value="soy"/>
                        <label for="soy">Soy</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sulfite" name="intolerances" value="sulfite"/>
                        <label for="sulfite">Sulfite</label>
                    </div>
                    <div>
                        <input type="checkbox" id="tree nut" name="intolerances" value="tree nut"/>
                        <label for="tree nut">Tree Nut</label>
                    </div>
                    <div>
                        <input type="checkbox" id="wheat" name="intolerances" value="wheat"/>
                        <label for="wheat">Wheat</label>
                    </div> */}
                    <p></p>
            </div>

            {items.map((element, index) => {
                return (
                    <div className="DRListItem">
                        <DRItem itemName={element} />
                        <input type="checkbox"/>
                        {/* <button // delete button
                            onClick={() => {
                                let newItems = [
                                    ...items.slice(0, index),
                                    ...items.slice(index + 1),
                                ];
                                setItems(newItems);
                            }}>
                                x
                            </button> */}
                    </div>
                )
            })} 


            {/* <input
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
            </button> */}

            
        </div>
    )
}

export default DietaryRestrictions;