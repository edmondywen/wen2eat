  import { Link, Outlet } from "react-router-dom"
//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import LoginForm from "./LoginForm"
import LoginSuccess from "./LoginSuccess"
import LoginFail from "./LoginFail"
import LogoutButton from "./LogoutButton"
import React, { useEffect, useState } from "react"
import './Login.css'
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import db from '../firebase'
import {collection, onSnapshot} from "@firebase/firestore"
import CreateAccount from "./CreateAccount"


let userCollectionID = "ingredients"


function handleSubmit(event)
{
  event.preventDefault(); 
  console.log("submitted something"); 
  console.log("USERNAME IS " + event.target.username.value + " , PASSWORD IS " + event.target.password.value);
}


function Login() {
  const[username, setUsername] = useState("stranger"); 
  const[password, setPassword] = useState(""); 
  const[submittedForm, setSubmittedForm] = useState(false); 
  const[users, setUsers] = useState({
    username: "",
    password: ""
  })

  const updateUsers = () => {
    return onSnapshot(collection(db, "users"), (snapshot) => 
      setUsers(snapshot.docs.map((doc) => ({username: doc.data().username, password: doc.data().password}))
      )
    )
  }
  useEffect(updateUsers, []); //Runs only once

  const resetUsername = () => {setUsername("")}
  const resetPassword = () => {setPassword("")}
  const resetSubmit = () => {setSubmittedForm(false)}

  const logout = () => {setUsername(""); setPassword(""); setSubmittedForm(false); userCollectionID = "ingredients"}

  const doAuthenticate = () =>
  {
    if(!submittedForm) 
      return null; //render nothing because we're still on the login form page 

    //Try to find a match for users 
    let len = users.length
    console.log("len is : " + len)
    let i = 0; 
    for( ; i < len; i++)
    {
        if(username == users[i].username && password == users[i].password)
        {
          userCollectionID = username + "_collection"
          return <Navigate to= "/LoginSuccess" ></Navigate>; 
        }
        else
        {
          console.log("Username " + username  + ", password: " + password
          + " does not match " + users[i].username + " and " + users[i].password)
        }

    }
      if(i == len)
      {
        console.log("Wrong username/password")
        resetUsername(); 
        resetPassword(); 
        resetSubmit(); 
        return <Navigate to= "/LoginFail"></Navigate>; 
      }
  }

  return (
  
    <div className="Login">
      <h1>wen2eat</h1>
    
      <LoginForm username={username} password={password} handleSubmit = {handleSubmit} setUsername = {setUsername} setPassword = {setPassword} setSubmittedForm = {() => setSubmittedForm(true)} resetUsername = {resetUsername} resetPassword = {resetPassword} resetSubmit = {resetSubmit} ></LoginForm>
    
      {doAuthenticate()}


      {/* {console.log(users)}
      {console.log(users.length)}
      {console.log(users[2])}
      {console.log("submittedForm is " + submittedForm)} */}
    </div>
    


  );
}

export {
  userCollectionID, 
  Login
}
//export default Login; 
