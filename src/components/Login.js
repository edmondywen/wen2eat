import LoginForm from "./LoginForm"
import React, { useEffect, useState } from "react"
import './Login.css'
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import db from '../firebase'
import {collection, onSnapshot} from "@firebase/firestore"
import CreateAccount from "./CreateAccount"


let userCollectionID = "ingredients"


function Login() {
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const[submittedForm, setSubmittedForm] = useState(false)
  const[users, setUsers] = useState({
    username: "",
    password: ""
  })
  const [creatingAccount, setCreatingAccount] = useState(false)

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

  const doAuthenticate = () =>
  {
    if(!submittedForm) 
      return null;

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

  return (creatingAccount) ? <CreateAccount setUsnm={setUsername} setPswd={setPassword} setCreatingAccount={setCreatingAccount}/> : 
  (
    <div className="Login">
      <h1>wen2eat</h1>
      <LoginForm username={username} password={password} setUsername = {setUsername} setPassword = {setPassword} setSubmittedForm = {() => setSubmittedForm(true)} resetUsername = {resetUsername} resetPassword = {resetPassword} resetSubmit = {resetSubmit} toCreate={() => setCreatingAccount(true)}></LoginForm>
      {doAuthenticate()}
    </div>
  )
}

export {
  userCollectionID, 
  Login
}
//export default Login; 
