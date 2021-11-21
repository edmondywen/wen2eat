import React from 'react'; 
import {Link } from "react-router-dom"

export const LoginFail= ({resetSubmit, resetUsername, resetPassword}) => {
    resetSubmit(); 
    resetUsername(); 
    resetPassword(); 
    return (
        <div>
            <p>Username or password was entered incorrectly.</p>
            <Link to = "/">Try again</Link>
        </div>
    )
}

export default LoginFail;