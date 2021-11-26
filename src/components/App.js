import Pantry from './Pantry.js'
import Recs from './Recs.js'
import './App.css';
import './Ingredient.css'

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
      "description": "We're no strangers to love You know the rules and so do I A full commitment's what I'm thinking of You wouldn't get this from any other guy", 
      "faved": "Whether this food is a favorite prime"
    }
  };
  
  let recs = [rec1, rec2];
  return (
    <div className="App">
      <header className="App-header">
        <Pantry></Pantry>
        <Recs data={recs}></Recs>
      </header>
    </div>
  );
}

export default App;