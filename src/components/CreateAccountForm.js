import React from 'react';
import { Link } from "react-router-dom"

export const CreateAccountForm = ({username, password, setUsername, setPassword, handleSubmit, userMessage}) => {
    return (
        <div>
            
          
          <form onSubmit={handleSubmit}>
              <label>Username:</label><br/>
              {/* onChange updates username every time the user enters/deletes a character  */}
              <input type="text" name="username" onChange={event => setUsername(event.target.value)}/><br/> 
              <label>Password:</label> <br/> 
              <input type="password" name="password" onChange={event => setPassword(event.target.value)}/><br/> 
              {userMessage()}
              <input type="submit" value="Create Account"/> 

          </form>
        </div>
    )
}

export default CreateAccountForm;