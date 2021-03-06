import { useEffect, useState } from "react"
import { Outlet, Link } from "react-router-dom";
import './Links.css'
import './Pantry.css'
import Ingredient from './Ingredient.js'
import { query, limit, orderBy, getDocs, onSnapshot, collection, setDoc, doc, addDoc, getDoc, deleteDoc} from "@firebase/firestore"
import db from '../firebase'
import {userCollectionID} from "./Login.js"
import DietaryRestrictions from "./DietaryRestrictions";

/*
PANTRY 
displays a list of the ingredients a user has available to them

props: 

states:
- items: an array of all of the items inside of the pantry 
*/

function Pantry({items, DietList, setDietList, IntolerancesList, setIntolerancesList}) {
    // const [items, setItems] = useState([]); //array of 3 item arrays where [0] is the item name and [1] is the exp date and [2] if the id
    const [text, setText] = useState(""); //submit box text 
    const [date, setDate] = useState(""); //expiration date. 
    const [onDR, setOnDR] = useState(false);

    

    function DietSet(x, isAdded) {
        // console.log("New iteration");
        // console.log(isAdded);
        // console.log(DietList);
        // if (isAdded) {
        //     console.log("you are here");
        //     const newDietList = DietList.filter(DietItem => x !== DietItem);
        //     setDietList(newDietList);
        // }
        // else {
        //     let copyDietList = DietList.slice();
        //     copyDietList.push(x);
        //     setDietList(copyDietList);
        // }
        // console.log(DietList);
        setDietList(x);
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

    const onFlip = () => {
        setOnDR(!onDR)
    }

    const submit = () => {
        if (text === ""){
            alert("add an ingredient");
            return;
        }
        const ingredient = {ingredient: text, expiration: date}
        addIngredient(ingredient)
        setText("");
    }

    async function deleteItem(element)
    {
        items.forEach(
            async (result) => {
                if(result.id === element.id)
                {
                    const docRef = doc(db, userCollectionID, result.id)
                    await deleteDoc(docRef)
                }
            }
          )
    }

    async function addIngredient(ingredient)
    {
        const collectionRef = collection(db, userCollectionID)
        // make sure the expiration date isn't null (ie dried pasta doesn't really expire)
        console.log(ingredient.expiration)
        const tempDate = new Date(ingredient.expiration)
        const diff = tempDate.getTimezoneOffset()
        ingredient['expiration'] = new Date(tempDate.getTime() + diff*60000);
        console.log(ingredient.expiration)
        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
        if (!ingredient.expiration){
            ingredient['expiration'] = "";
        }

        // make sure that the date is valid. invalid dates will still be Date objects so instanceof checks fail
        if(ingredient['expiration'] == "Invalid Date"){ 
            delete ingredient.expiration
        }
        await addDoc(collectionRef, ingredient)
    }

    return (onDR) ? <DietaryRestrictions onFlip={onFlip} DietSet={DietSet} IntolerancesSet={IntolerancesSet} DietList={DietList} IntolerancesList={IntolerancesList}/> : (
        <div className="Pantry">
            <h1>Pantry</h1>
            <div className="Links">
                {/* <Link to="/pantry">Pantry</Link> | {" "} */}
                {/* <Link to="/dr"> */}
                <button onClick = {onFlip} id="Linkbutton">
                    {/* <img src = "../Images/flip-arrow.png"/> */}
                    Flip to Dietary Restrictions
                </button>
                {/* </Link> */}
            </div>

            {items.map((element, index) => {
                return (
                    <div className="Pantry-Item">
                        <Ingredient itemName = {element.ingredient} expDate = {element.expiration.toLocaleString().substring(0,10)}/>
                        {/* <input type="checkbox"/> */}
                        <button //delete button
                        onClick = {()=>(deleteItem(element))}>
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
            <input //TODO: ADD DATE VALIDATION
                id="date-box"
                placeholder="Expiration"
                type="date"
                onChange = {(event) => setDate(event.target.value)}
                // value={date}
            ></input>

            <button
                id="submit-button"
                onClick={submit}
            >
                Submit 
            </button>
        </div>
    );
}

export default Pantry;