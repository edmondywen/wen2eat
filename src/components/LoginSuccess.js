import React from 'react'; 
import {Link } from "react-router-dom"

export const LoginSuccess= () => {
    return (
        <div>
            <p>Login successful</p>
            <Link to = "/">See your pantry</Link>
        </div>
    )
    //TODO: display the user's pantry 
    //General idea: replace the body of this with the pantry/recommendations from the other branches, 
    //except change the collection id to the user's specific collection id 
}

export default LoginSuccess;