import Pantry from './Pantry.js'
import Recs from './Recs.js'
import './App.css';
import './Ingredient.css'

function App() {
  let rec1 = {"id": 1, "recipe": {"title": "Name of food", "description": "Description of food", "faved": "Whether this food is a favorite"}};
  let rec2 = {"id": 2, "recipe": {"title": "Name of food prime", "description": "Description of food prime", "faved": "Whether this food is a favorite prime"}};
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