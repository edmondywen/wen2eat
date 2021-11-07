import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export const ingredient_form = ({ingChange, onSubmit, expChange, current_ingredient, current_expiration}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Ingredient:</label><br/>
                <input type="text" name="ing" onChange={ingChange} value={current_ingredient}/><br/>
                <label>Expiration:</label><br/>
                <DatePicker selected={current_expiration} onChange={date => expChange(date)}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default ingredient_form;