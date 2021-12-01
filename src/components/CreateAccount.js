
import React, { useEffect, useState } from "react"
import { Alert } from 'react-alert'
import { collection, addDoc, getDocs } from "@firebase/firestore"

import db from '../firebase'
import CreateAccountForm from "./CreateAccountForm.js"








function CreateAccount()
{
    const[username, setUsername] = useState(""); 
    const[password, setPassword] = useState(""); 
    const [invalidUser, setInvalidUser] = useState(false)

function handleSubmit(event)
{
    event.preventDefault(); 
    console.log("something was submitted");
    attemptToAddAccount(event.target.username.value, event.target.password.value); 
}

async function usernameIsAvailable(username)
{
    const querySnapshot = await getDocs(collection(db, "users"));
    let len = querySnapshot.size
    console.log("len is " + len)

    // console.log(querySnapshot.docs)
    // console.log(querySnapshot.docs[0].data().username)
    for (let i = 0; i < len; i++)
    {
        if(username == querySnapshot.docs[i].data().username)
        {
            console.log("Username is taken")
            return false; 
        }
    }
    return true
    }

    async function addAccountToDatabase(user, pass)
    {
        const collectionRef = collection(db, "users")
        await addDoc(collectionRef, {
            username: user, 
            password: pass
        })
    }
    async function attemptToAddAccount(user, pass)
    {
        if(await usernameIsAvailable(user))
        {
            alert("That username is available. You can go back to the homepage now and log in.")
            addAccountToDatabase(user, pass)
        }
        else
        {
            setInvalidUser(true);
        }
        //Note: Don't need to create a new collection for the user because Firebase automatically does that for us when we attempt to add a doc to the new collection
    }

    const message = () =>
    {
        if(invalidUser)
        {
            return (<p>That username is not available you loser</p>)
        }
        return null
    }

    useEffect( () => {console.log(username)}); 

    return(
        <CreateAccountForm  username={username} password={password} setUsername = {setUsername} setPassword = {setPassword} handleSubmit={handleSubmit} userMessage={message}/>

    )
}

export default CreateAccount; 