//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import LoginForm from "./components/LoginForm"
import LoginSuccess from "./components/LoginSuccess"
import LoginFail from "./components/LoginFail"
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { useNavigate, useHisotry } from "react-router-dom"
import db from './firebase'
import {collection, onSnapshot} from "@firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function renderLoginResult(username, password)
{
  console.log("rendering LoginResult"); 

  useAuth(username, password)
}

function useAuth(username, password)
{
  const auth = getAuth(); 
  const navigate = useNavigate(); 

  console.log("running authenticateUser")
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      navigate("LoginSuccess")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      navigate("LoginFail")
    });     
}


function LoginResult(props)
{


}



function handleSubmit(event)
{
  event.preventDefault(); 
  console.log("submitted something"); 
  console.log("USERNAME IS " + event.target.username.value + " , PASSWORD IS " + event.target.password.value);
  renderLoginResult(event.target.username.value, event.target.password.value); 
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
        <Route path = "/" element = {<LoginForm username={username} password={password} handleSubmit = {handleSubmit} setUsername = {setUsername} setPassword = {setPassword} ></LoginForm>} />

        <Route path="LoginSuccess/*" element = {<LoginSuccess />} />

        <Route path="LoginFail/*" element = {<LoginFail resetSubmit = {() => setSubmittedForm(false)} resetUsername = {() => setUsername("")} resetPassword = {() => setPassword("")}/>} />

      </Routes>
    </div>
    
    {/* {console.log(users)}
    {console.log(users.length)}
    {console.log(users[0])}
    {console.log(users[1])} */}
    {/* {renderLoginResult(username, password, submittedForm, users)} */}
    </Router>
  );
}


export default App; 
