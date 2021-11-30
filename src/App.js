//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import LoginForm from "./components/LoginForm"
import LoginSuccess from "./components/LoginSuccess"
import LoginFail from "./components/LoginFail"
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate, Link} from "react-router-dom"
import db from './firebase'
import {collection, onSnapshot} from "@firebase/firestore"



function renderLoginResult(username, password, submittedForm, users)
{
  console.log("rendering LoginResult"); 

  return (<LoginResult username = {username} password = {password} submittedForm = {submittedForm} users = {users} ></LoginResult>); 
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
      console.log("Found a match")
      return <Navigate to= "LoginSuccess"></Navigate>; 
    }
  }
  if(i == len)
  {
    return <Navigate to= "LoginFail"></Navigate>; 
  }


}

function handleSubmit(event)
{
  event.preventDefault(); 
  console.log("submitted something"); 
  console.log("USERNAME IS " + event.target.username.value + " , PASSWORD IS " + event.target.password.value);
}


function App() {
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

  return (
    <Router>
    <div className="body">
      <h1>Wen2Eat</h1>
      <Routes>
        <Route path = "/" element = {<LoginForm username={username} password={password} handleSubmit = {handleSubmit} setUsername = {setUsername} setPassword = {setPassword} onSubmitButton = {() => setSubmittedForm(true)}></LoginForm>} />

        <Route path="LoginSuccess/*" element = {<LoginSuccess />} />

        <Route path="LoginFail/*" element = {<LoginFail resetSubmit = {() => setSubmittedForm(false)} resetUsername = {() => setUsername("")} resetPassword = {() => setPassword("")}/>} />

      </Routes>
    </div>
    
    {console.log(users)}
    {console.log(users.length)}
    {console.log(users[0])}
    {console.log(users[1])}
    {renderLoginResult(username, password, submittedForm, users)}
    </Router>
  );
}


export default App; 
