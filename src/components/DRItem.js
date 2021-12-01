import {useState} from "react";
import React, { Component } from 'react';

function DRItem(props) {
    const [isChecked, changeChecked] = useState(props.isChecked);
    return (
        <div>
            <input type="checkbox" id={props.id} name={props.name} value={props.value} checked={isChecked} 
                onChange={ () => {
                    props.changeFunction(props.id, isChecked);
                    changeChecked(!isChecked); 
                } }
            />
            <label for={props.id}>{props.value}</label>
        </div>
    );
}


export default DRItem;