import React from 'react';
import { Link } from 'react-router-dom'
import './LoginForm.css'

export const login_form = ({username, password, setUsername, setPassword, setSubmittedForm, toCreate}) => {
    return (
        <div className = "Login-Form">
          <p>Hello, {username === "" ? "stranger" : username}!</p>
          {/* <p>The password you entered is {password}</p> */}
          
          <form onSubmit={(event) => {
              event.preventDefault(); 
              setSubmittedForm(); 
              }}>
              <label>Username:</label><br/>
              {/* onChange updates username every time the user enters/deletes a character  */}
              <input type="text" name="username" value={username} onChange={event => setUsername(event.target.value)}/><br/> 
              <label>Password:</label> <br/> 
              <input type="password" name="password" value={password} onChange={event => setPassword(event.target.value)}/><br/> 
              <input type="submit" value="Submit"/> 
          </form>
          <button onClick={() => toCreate(true)}>Create Account</button>
        </div>

    )
}

export default login_form;