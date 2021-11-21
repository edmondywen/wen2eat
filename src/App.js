//Spoonacular API Key: f87bfe3073584580bd8a6fb6eafa20f8

import LoginForm from "./components/LoginForm"
import LoginSuccess from "./components/LoginSuccess"
import LoginFail from "./components/LoginFail"
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom"

const sampleuser = "forgetfulperson"; //Hardcoded username/password for testing purposes
const samplepassword = "passwd"; 

function renderAuthenticate(username, password, submittedForm)
{
  console.log("rendering authenticate"); 

  if(submittedForm)
  {
    console.log("authenticate sees form submit")
  }
  else
    console.log("authenticate does not see form submit")

  return (<Authenticate username = {username} password = {password} submittedForm = {submittedForm}></Authenticate>); 
}

function Authenticate(props)
{
  // console.log("passed in username as " + props.username); 
  // console.log("passed in password as " + props.password); 

  if(!props.submittedForm)
    return (<p>no submit form yet</p>); //this also gets rendered on LoginFail because we reset submittedForm to false; need to fix that 
  
  if(props.username == sampleuser && props.password == samplepassword)
  {
    console.log("logging you in....."); 
    return (<Redirect to = "/LoginSuccess"></Redirect>); 
  }
  else{
    console.log("wrong username/password"); 
    return(<Redirect to = "/LoginFail"></Redirect>); 
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

  useEffect(() => {
    console.log("username updated"); 

  }); 

  return (
    <Router>
    <div className="body">
      <h1>Wen2Eat</h1>
      <Switch>
        <Route exact path = "/"> 
          {/* <button onClick={() => setSubmittedForm(!submittedForm)}>Click me to toggle submittedForm</button> */}

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
