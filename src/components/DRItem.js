import {useState} from "react";
import React, { Component } from 'react';

function DRItem(props) {
    const [isChecked, changeChecked] = useState(false);
    return (
        <div>
            <input type="checkbox" id={props.id} name={props.name} value={props.value} checked={isChecked} 
                onChange={ () => {
                    // console.log(isChecked);
                    // if (!isChecked) {
                    //     props.changeFunction(props.id, isChecked);
                    // }
                    props.changeFunction(props.id, isChecked);
                    changeChecked(!isChecked); 
                } }
            />
            <label for={props.id}>{props.value}</label>
        </div>
    );
}


export default DRItem;