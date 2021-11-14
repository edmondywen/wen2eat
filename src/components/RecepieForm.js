import React from 'react'

const RecepieForm = ({onSubmit, }) => {
    const [formVals]
    return (
        <div>
                <form onSubmit={onSubmit}>
                <label>GeneralSearch:</label><br/>
                <input type="text" name="ing" onChange={ingChange} value={current_ingredient}/><br/>
                <label>Expiration:</label><br/>
                <DatePicker selected={current_expiration} onChange={date => expChange(date)}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default RecepieForm
