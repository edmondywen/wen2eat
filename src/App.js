//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import LoginForm from "./components/LoginForm"
import LoginSuccess from "./components/LoginSuccess"
import LoginFail from "./components/LoginFail"
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom"
import db from './firebase'
import {collection, getDocs, onSnapshot} from "@firebase/firestore"

const sampleuser = "forgetfulperson"; //Hardcoded username/password for testing purposes
const samplepassword = "passwd"; 
//let authenticating = false; 



async function getQuerySnapshot()
{
  //Search the collection "users" for a document with matching username and password 
  const querySnapshot = await getDocs(collection(db, "users"));  
  console.log("getQuerySnapshot was called")
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  return querySnapshot; 
}

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
      return <Redirect to= "LoginSuccess"></Redirect>; 
    }
  }
  if(i == len)
  {
    return <Redirect to= "LoginFail"></Redirect>; 
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
      <Switch>
        <Route exact path = "/"> 
          {/* <button onClick={() => seeDocs(username, password)}>Click me to test querySnapshot</button> */}
          
          <LoginForm username={username} password={password} handleSubmit = {handleSubmit} setUsername = {setUsername} setPassword = {setPassword} onSubmitButton = {() => setSubmittedForm(true)}></LoginForm>

        </Route>

        <Route exact path="/LoginSuccess">
          <LoginSuccess />
        </Route>

        <Route exact path="/LoginFail">
          <LoginFail resetSubmit = {() => setSubmittedForm(false)} resetUsername = {() => setUsername("")} resetPassword = {() => setPassword("")}/>
        </Route>

      </Switch>
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
