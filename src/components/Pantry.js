import { useState } from "react";
import './Pantry.css'


function Pantry() {
    const [items, setItems] = useState([]);
    return (
        <ul>
            <li>hello</li>
            <li>item 2</li>
        </ul>
    );
}

export default Pantry