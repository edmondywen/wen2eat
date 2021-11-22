//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import LoginForm from "./components/LoginForm"
import LoginSuccess from "./components/LoginSuccess"
import LoginFail from "./components/LoginFail"
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom"
import db from './firebase'
import {collection, getDocs} from "@firebase/firestore"

const sampleuser = "forgetfulperson"; //Hardcoded username/password for testing purposes
const samplepassword = "passwd"; 

async function getQuerySnapshot()
{
  //Search the collection "users" for a document with matching username and password 
  const querySnapshot = await getDocs(collection(db, "users"));  
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  return querySnapshot; 
}

// async function getQueryObjects()
// {
//   let users = []; 
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//     let user = { 
//       username: doc.data().username, 
//       password: doc.data().password
//     }
//     users.push(user); 
//     console.log("Pushed " + user.username + " " + user.password); 
//   });

//   console.log(users); 

//   return users; 
// }

function renderAuthenticate(username, password, submittedForm)
{
  console.log("rendering authenticate"); 

  if(submittedForm)
  {
    console.log("authenticate sees form submit")
  }
  else
    console.log("authenticate does not see form submit")

  return (<Authenticate username = {username} password = {password} submittedForm = {submittedForm} ></Authenticate>); 
}

function Authenticate(props)
{
  // console.log("passed in username as " + props.username); 
  // console.log("passed in password as " + props.password); 

  if(!props.submittedForm)
    return (<p>no submit form yet</p>); //this also gets rendered on LoginFail because we reset submittedForm to false; need to fix that 

    //NOTE: doesn't recognize valid username/passwords; prints out both if/else blocks in the same millisecond???? 
  const querySnapshot = getQuerySnapshot(); 
  // console.log("Type is " + typeof(querySnapshot)); 
  // console.log(querySnapshot)
  let counter = 0; 
  let len = 0; 
  querySnapshot.then(
     querySnapshot => {
       len = querySnapshot.size; 
       console.log("querySnapshot size is " + querySnapshot.size); 

       querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log("size is " + querySnapshot.size)
        //console.log("Looking for " + props.username + " and " + props.password); 
        if(doc.data().username == props.username && doc.data().password == props.password)
        {
          console.log("Found a match at " + Date.now())
          return(<Redirect to = "/LoginSuccess"></Redirect>); 
        }
        else 
        {
          console.log("havent found a match for username " + props.username + " and password " + props.password + " at " + Date.now())
        }
        counter++; 
      });

    }
  )
  .catch(
    (error) => console.log(error)
  ) 

  if(counter == len)
  {
    console.log("wrong username/password"); 
    return(<Redirect to = "/LoginFail"></Redirect>);
  }

  // if(props.username == sampleuser && props.password == samplepassword)
  // {
  //   console.log("logging you in....."); 
  //   return (<Redirect to = "/LoginSuccess"></Redirect>); 
  // }
  // else{
  //   console.log("wrong username/password"); 
  //   return(<Redirect to = "/LoginFail"></Redirect>); 
  // }
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

  useEffect(() => {
    console.log("username updated"); 
  }); 

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
    

    {renderAuthenticate(username, password, submittedForm)}
    </Router>
  );
}

export {
  App, 
  Authenticate
}
export default App; 
