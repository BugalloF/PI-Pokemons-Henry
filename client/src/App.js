import './App.css';
import {Route,Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import PokeDetail from './components/PokeDetail'
import CreatePoke from './components/CreatePoke'


function App() {
  return (
    <div className="App">
      <Switch>

      <Route path='/' exact component={LandingPage}/>
      <Route path='/home' exact component={Home}/>
      <Route path='/pokemons/:id/' component={PokeDetail}/>
      <Route path='/createpoke' component={CreatePoke}/>
      </Switch>
    </div>
  );
}

export default App;
