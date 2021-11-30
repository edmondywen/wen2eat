import React from 'react'; 
import {Link, Navigate } from "react-router-dom"

export const LoginSuccess= () => {
    return (
        <div>
            <p>Login successful</p>
            <Navigate to = "/">See your pantry</Navigate>
        </div>
    )
    //TODO: display the user's pantry 
    //General idea: replace the body of this with the pantry/recommendations from the other branches, 
    //except change the collection id to the user's specific collection id 
}

export default LoginSuccess;