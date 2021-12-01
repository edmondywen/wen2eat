import React from 'react';
import { Link } from "react-router-dom"

export const CreateAccountForm = ({username, password, setUsername, setPassword, handleSubmit}) => {
    return (
        <div className = "LoginContainer">
            <div className = "Login">
                {/* <h1> wen2eat </h1> */}
                <img src = "https://i.imgur.com/on0rQlH.png" alt="wen2eat logo"></img>
                <Link to="/">
                    <button id = "LinkHome">Return to home</button>
                </Link>
                <h2> THIS IS NOT SECURE AT ALL; do not use any account details that you use anywhere else.</h2>
            <p>The username you want is: {username}</p>
            <p>The password you want is: {password}</p>
            
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br/>
                {/* onChange updates username every time the user enters/deletes a character  */}
                <input type="text" name="username" onChange={event => setUsername(event.target.value)}/><br/> 
                <label>Password:</label> <br/> 
                <input type="password" name="password" onChange={event => setPassword(event.target.value)}/><br/> 
                <input type="submit" value="Submit"/> 
            </form>
            </div>
        </div>
    )
}

export default CreateAccountForm;