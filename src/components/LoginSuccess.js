import React from 'react'; 

export const LoginSuccess= ({username}) => {
    return (
        <div className = "welcomeMessage">
            <p>Login successful</p>
            <p>Welcome, {username}!</p>
        </div>
    )
    //TODO: display the user's pantry 
    //General idea: replace the body of this with the pantry/recommendations from the other branches, 
    //except change the collection id to the user's specific collection id 
}

export default LoginSuccess;