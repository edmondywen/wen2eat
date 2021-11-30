import React from 'react';


export const login_form = ({username, password, handleSubmit, setUsername, setPassword, onSubmitButton}) => {
    return (
        <div>
          <p>Hello, {username}!</p>
          <p>The password you entered is {password}</p>
          
          <form onSubmit={(event) => {onSubmitButton(); handleSubmit(event); }}>
              <label>Username:</label><br/>
              {/* onChange updates username every time the user enters/deletes a character  */}
              <input type="text" name="username" onChange={event => setUsername(event.target.value)}/><br/> 
              <label>Password:</label> <br/> 
              <input type="password" name="password" onChange={event => setPassword(event.target.value)}/><br/> 
              <input type="submit" value="Submit"/> 
          </form>
        </div>

    )
}

export default login_form;