import React from 'react';

//not complete 

export const login_form = ({onSubmit, changeUsername, changePassword}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Username:</label><br/>
                <input type="text" name="username" onChange={changeUsername}/><br/>
                <label>Password:</label><br/>
                <input type="password" name="password" onChange={changePassword}/><br/>
            </form>
        </div>
    )
}

export default ingredient_form;