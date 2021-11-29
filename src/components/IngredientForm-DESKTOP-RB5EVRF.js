import React from 'react'

export const ingredient_form = ({ingChange, onSubmit, expChange}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Ingredient:</label><br/>
                <input type="text" name="ing" onChange={ingChange}/><br/>
                <label>Expiration:</label><br/>
                <input type="text" name="exp" onChange={expChange}/><br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default ingredient_form;