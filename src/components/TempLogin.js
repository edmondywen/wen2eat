import { Link, Outlet } from "react-router-dom"
//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import LoginForm from "./LoginForm"
import LoginSuccess from "./LoginSuccess"
import LoginFail from "./LoginFail"
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import db from '../firebase'
import {collection, onSnapshot} from "@firebase/firestore"


let userCollectionID = "ingredients"

function renderLoginResult(username, password, submittedForm, users, resetUsername, resetPassword, resetSubmit)
{
  console.log("rendering LoginResult"); 

  return (<LoginResult username = {username} password = {password} submittedForm = {submittedForm} users = {users} resetUsername = {() => resetUsername} resetPassword = {() => resetPassword} resetSubmit = {() => resetSubmit}></LoginResult>); 
}


function LoginResult(props)
{
  if(!props.submittedForm) 
    return null; //render nothing because we're still on the login form page 

  //Try to find a match for users 
  let len = props.users.length
  let i = 0; 
  for( ; i < len; i++)
  {
    if(props.username == props.users[i].username && props.password == props.users[i].password)
    {
      props.resetSubmit(); 
      userCollectionID = props.username + "_collection"
      return <Navigate to= "/LoginSuccess" ></Navigate>; 
    }
    else
    {
      console.log("Username " + props.username  + ", password: " + props.password
      + " does not match " + props.users[i].username + " and " + props.users[i].password)
    }
  }
  if(i == len)
  {
    console.log("Wrong username/password")
    props.resetUsername(); 
    props.resetPassword(); 
    props.resetSubmit(); 
    return <Navigate to= "/LoginFail"></Navigate>; 
  }


}

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

  return (
  
    <div className="body">
      <h1>Wen2Eat</h1>
    
      <LoginForm username={username} password={password} handleSubmit = {handleSubmit} setUsername = {setUsername} setPassword = {setPassword} onSubmitButton = {() => setSubmittedForm(true)} resetUsername = {resetUsername} resetPassword = {resetPassword} resetSubmit = {resetSubmit} ></LoginForm>
    
      {renderLoginResult(username, password, submittedForm, users)}

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
