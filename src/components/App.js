import Pantry from './Pantry.js'
import Recs from './Recs.js'
import { Link, Outlet } from "react-router-dom"
import './App.css';
import './Ingredient.css'
import './Links.css'

function App() {
  let rec1 = {
    "id": 1, 
    "recipe": {
      "title": "Name of food", 
      "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ", 
      "faved": "Whether this food is a favorite"
    }
  };

  let rec2 = {
    "id": 2, 
    "recipe": {
      "title": "Name of food prime", 
      "description": "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway, because bees don't care what humans think is impossible.", 
      "faved": "Whether this food is a favorite prime"
    }
  };
  
  let recs = [rec1, rec2];
  return (
    <div className="App">
      <div className="App-header">
        <div className="Header-text">
          <h1>hey, are you wondering what to make &</h1>
          <img src = "https://i.imgur.com/on0rQlH.png" alt="wen2eat logo"></img>
          <h1>?</h1>
        </div>
        <div className="Login-button-area">
          <div className="Links">
                <Link to="/login">
                    <button id = "Linkbutton">
                        Login
                    </button>
                </Link>
                 {/* | {" "} */}
                {/* <Link to="/dr">Dietary Restrictions</Link> */}
            </div>
        </div>
      </div>
      <div className="App-body">
        <Outlet></Outlet>
        <Recs data={recs}></Recs>
      </div>
    </div>
  );
}

export default App;