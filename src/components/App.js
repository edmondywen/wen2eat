import Pantry from './Pantry.js'
import Recs from './Recs.js'
import './App.css';
import './Ingredient.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Pantry></Pantry>
        <Recs></Recs>
      </header>
    </div>
  );
}

export default App;