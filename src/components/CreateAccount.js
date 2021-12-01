import React, { useEffect, useState } from "react"
import { collection, addDoc, getDocs } from "@firebase/firestore"
import db from '../firebase'
import CreateAccountForm from "./CreateAccountForm.js"


function CreateAccount({setUsnm, setPswd, setCreatingAccount})
{
    const[username, setUsername] = useState(""); 
    const[password, setPassword] = useState(""); 
    const [userState, setUserState] = useState(0)
    //0 = not submitted anything yet 
    //1 = invalid username (taken)
    //2 = invalid password length 
    //3 = valid username and password

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
        console.log(pass.length)
        if((await usernameIsAvailable(user)) && pass.length > 0)
        {
            setUserState(3)
            addAccountToDatabase(user, pass)
            setUsnm(user)
            setPswd(pass)
            setCreatingAccount(false)
        }
        else if (pass.length == 0)
        {
            console.log("password too short")
            setUserState(2)
        }
        else
        {
            setUserState(1)
        }
        //Note: Don't need to create a new collection for the user because Firebase automatically does that for us when we attempt to add a doc to the new collection
    }

    const message = () =>
    {
        if(userState===1)
        {
            return (<p>That username is not available you loser</p>)
        }else if(userState == 2)
        {
            return (<p>That password is not valid you blockhead</p>)
        }
        return null
    }

    useEffect( () => {console.log(username)}); 

    return(
        <div className = "LoginContainer">
            <div className = "Login">
                <div>
                    <img src = "https://i.imgur.com/on0rQlH.png" alt="wen2eat logo"></img>
                    <br/>
                    <button onClick={() => {
                        setCreatingAccount(false)
                        }}>
                        Return to home
                    </button>
                    <h2> THIS IS NOT SECURE AT ALL; do not use any account details that you use anywhere else.</h2>
                <p>The username you want is: {username}</p>
                <p>The password you want is: {password}</p>
                </div>
                <CreateAccountForm  username={username} password={password} setUsername = {setUsername} setPassword = {setPassword} handleSubmit={handleSubmit} userMessage={message}/>
            </div>
        </div>
    )
}

export default CreateAccount; 