import { Outlet, Link } from "react-router-dom";
import './Links.css'

function DietaryRestrictions(){
    return(
        <div className="DR">
            <h1>Dietary Restrictions :)</h1>
            <div className="Links">
                <Link to="/pantry">Pantry</Link> | {" "}
                <Link to="/dr">Dietary Restrictions</Link>
            </div>
        </div>

    )
}

export default DietaryRestrictions;