import React from 'react'

export const ingredient_form = ({ingChange, onSubmit, expChange, current_ingredient, current_expiration}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Ingredient:</label><br/>
                <input type="text" name="ing" onChange={ingChange} value={current_ingredient}/><br/>
                <label>Expiration:</label><br/>
                <input type="text" name="exp" onChange={expChange} value={current_expiration}/><br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default ingredient_form;