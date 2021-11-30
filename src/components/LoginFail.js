import React from 'react'; 
import {Link } from "react-router-dom"

export const LoginFail= () => {
    return (
        <div>
            <p>Username or password was entered incorrectly.</p>
            <Link to = "/login">Try again</Link>
        </div>
    )
}

export default LoginFail;