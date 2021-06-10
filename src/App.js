import './App.css';
import './colors.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {useState, useEffect} from "react";
import DAO from "./DAO";

import {PokemonContext} from "./components/PokemonContext";

import Home from "./components/Home"
import MoreAboutPokemon from "./components/MoreAboutPokemon/MoreAboutPokemon"


export default function App() {

  const [loaded, set_loaded] = useState(false);
  const [all_pokemon, set_all_pokemon] = useState(null);
  const [pokemons, set_pokemons] = useState(all_pokemon ? all_pokemon : null);
  const [types, set_type] = useState([]);
  const [move, set_all_move] = useState([]);
  const [all_region, set_all_region] = useState([]);
  const api = new DAO();
  const template_color = {
    normal: "#C6C5A7",
    fighting: "#B25E4F",
    flying: "#C6B7F4",
    poison: "#C183C1",
    ground: "#EAD69D",
    rock: "#D0C17C",
    bug: "#CAE18D",
    ghost: "#A293BC",
    steel: "#D1D1E0",
    fire: "#FA6D6B",
    water: "#77BCFD",
    grass: "#47D0AF",
    electric: "#FFD86F",
    psychic: "#FA92B3",
    ice: "#99D8D8",
    dark: "#A19388",
    dragon: "#A27CFA",
    fairy: "#F3BDC9",
    unknown: "#9DC1B7",
    shadow: "#3E3E3E",
  }

  useEffect(() => {
    get_type();
    get_all_pokemons();
    get_all_move();
    get_all_region();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_type = async() => {
    await api.getType().then((data) => {
      let array = data.results;
      for (let i = 0; i < data.results.length; i++) {
          array.type = data.results[i].name;
          array.url = data.results[i].url;
      }
      set_type(array.sort(function(a, b) {
        return a.name.toUpperCase() > b.name.toUpperCase();
      }));
    });
  }

  const get_all_region = async() => {
    let region = {};
    await api.getAllRegion().then(async(data) => {
      region = data.results;
    });
    set_all_region(region.map(x => x.name));
  }

  const get_all_move = async() => {
    let move = [];

    for (let i = 1; i < 796; i += 1) {
      if (i === 785)
        i += 1
      await api.getMove(i).then(async(data) => {
          move.push(data);
      });
    }
    set_all_move(move);
  }

  const get_all_pokemons = () => {
    set_loaded(false);
    api.getPokemons(0, 150).then(async(data) => {
      await api.getPokemons(0, 1050).then(async(data) => {
        let array = data.results;
        for (let i = 0; i < array.length; i++) {
            await api.getPokemonInfo(array[i].name).then((data) => {
                array[i].more = data;
                array[i].image = data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.other["official-artwork"].front_default ? data.sprites.other["official-artwork"].front_default : data.sprites.front_default;
            });
            if(i % 100 === 0) {
              set_all_pokemon(array.slice(0,i));
              set_pokemons(array.slice(0,i));
              set_loaded(true);
            }
        }
        set_all_pokemon(array);
        set_pokemons(array);
        set_loaded(true);
      })
    });
  }


  return (
    <div className="App">
      <PokemonContext.Provider value={null}>
        <Router>
          <Switch>
            <Route path="/pokemon/:id">
              <MoreAboutPokemon template_color={template_color} />
            </Route>
            <Route path="/">
              <Home template_color={template_color} all_pokemon={all_pokemon} pokemons={pokemons} types={types} loaded={loaded} move={move} all_region={all_region}/>
            </Route>
          </Switch>
        </Router>
      </PokemonContext.Provider>
    </div>
  );
}

