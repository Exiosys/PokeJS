import './App.css';
import './colors.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {PokemonContext} from "./components/PokemonContext";

import Header from "./components/Header"
import Home from "./components/Home"
import MoreAboutPokemon from "./components/MoreAboutPokemon/MoreAboutPokemon"


export default function App() {
  return (
    <div className="App">
      <PokemonContext.Provider value={null}>
        <Router>
          <Switch>
            <Route path="/pokemon/:id">
              <MoreAboutPokemon />
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </Router>
      </PokemonContext.Provider>
    </div>
  );
}

