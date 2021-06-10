import React, { useEffect, useState } from "react";
import "../../css/MoreAboutPokemon.css";
import row from "../../assets/arrow.png";
import { withRouter } from "react-router-dom";
import pokeball from "../../pokeball.png";
import About from "./About";
import BaseStats from "./BaseStats";
import Evolution from "./Evolution";
import Moves from "./Moves";
import $ from "jquery";
import DAO from "../../DAO";
import unknown_img from "../../assets/unknown.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Items from "./Items";
import Tooltip from "@material-ui/core/Tooltip";
import "../../css/404.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "../Header";

function MoreAboutPokemon(props) {
  const [evolution_loaded, set_evolution_loaded] = useState(false);
  const [pokemon, set_pokemon] = useState(null);
  const [tab, set_tab] = useState(0);
  const [characteristic, set_characteristic] = useState(null);
  const [species, set_species] = useState(null);
  const [evolution, set_evolution] = useState([]);
  const api = new DAO();
  const [moves, set_moves] = useState(null);
  const [held_items, set_held_items] = useState(null);
  const [actualy_image, set_actualy_image] = useState(1);
  const images_list = ["Female", "Male", "Shiny"];
  const image_list_src = [
    pokemon ? pokemon.sprites.front_female : null,
    pokemon
      ? pokemon.sprites.other.dream_world.front_default
        ? pokemon.sprites.other.dream_world.front_default
        : pokemon.sprites.other["official-artwork"].front_default
        ? pokemon.sprites.other["official-artwork"].front_default
        : pokemon.sprites.front_default
      : null,
    pokemon ? pokemon.sprites.front_shiny : null,
  ];
  const [error, set_error] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div role="presentation">
      <List>
        <ListItem>
          <form className="input-div">
            <Header logo={true} />
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href =
                      "/" +
                      document
                        .getElementById("input-with-icon-grid-drawer")
                        .value.toLowerCase()
                        .trim();
                  }}
                  className="btn-search"
                >
                  <SearchIcon style={{ cursor: "pointer" }} />
                </button>
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid-drawer"
                  onChange={handleOnSearch}
                  label="Search a pokémon"
                />
              </Grid>
            </Grid>
          </form>
        </ListItem>
      </List>
    </div>
  );

  useEffect(() => {
    const get_pokemon = async () => {
      await api
        .getPokemonByID(props.match.params.id)
        .then((data) => {
          set_pokemon(data);
          get_held_items(data.held_items);
          get_moves(data.moves);
          get_about(data.id);
        })
        .catch((error) => {
          set_error(true);
        });
    };
    get_pokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_held_items = async (held_items) => {
    let array = [];
    held_items.map(async (item, i) => {
      let held_item = {};
      await api.getItemInfoByURL(item.item.url).then((data) => {
        held_item.image = data.sprites.default;
        held_item.name = data.name;
        held_item.text = data.effect_entries.find(
          (x) => x.language.name === "en"
        ).effect;
        held_item.price = data.cost;
      });
      array.push(held_item);
      array.sort(function (a, b) {
        return a.name.toUpperCase() > b.name.toUpperCase();
      });
    });
    set_held_items(array);
  };

  const get_moves = async (moves) => {
    let array = [];
    moves.map(async (move, i) => {
      let move_object = {};
      await api.getPokemonMovesByURL(move.move.url).then((data) => {
        move_object.name = data.name;
        move_object.accuracy = data.accuracy;
        move_object.power = data.power;
        move_object.chance = data.effect_chance;
        move_object.pp = data.pp;
        move_object.type = data.type.name;
        move_object.effect =
          data.effect_entries !== undefined
            ? data.effect_entries[0].effect
            : null;
      });
      array.push(move_object);
      array.sort(function (a, b) {
        return a.name.toUpperCase() > b.name.toUpperCase();
      });
    });
    set_moves(array);
  };

  const get_about = (id) => {
    api.getCharacteristicByID(id).then((data) => {
      set_characteristic(data);
    });
    api
      .getSpeciesByID(id)
      .then((data) => {
        set_species(data);
        get_evolution(data.evolution_chain);
      })
      .catch(() => {
        set_evolution_loaded(true);
      });
  };

  const get_evolution = (url) => {
    set_evolution_loaded(false);
    api
      .getEvolutionByURL(url)
      .then((data) => {
        let current_evolve_item = data.chain;
        let array = [];
        current_evolve_item.evolves_to.map(async (pokemon, i) => {
          let object = [];
          let pokemon0 = {};
          pokemon0.name = data.chain.species.name;
          await api.getPokemonInfo(data.chain.species.name).then((data) => {
            pokemon0.image = data.sprites.other.dream_world.front_default;
            pokemon0.id = data.id;
          });
          object[0] = pokemon0;
          let pokemon1 = {};
          pokemon1.level_up = pokemon.evolution_details[0];
          pokemon1.name = pokemon.species.name;
          await api.getPokemonInfo(pokemon.species.name).then((data) => {
            pokemon1.image = data.sprites.other.dream_world.front_default;
            pokemon1.id = data.id;
          });
          object[1] = pokemon1;
          if (pokemon.evolves_to.length > 0) {
            let pokemon2 = {};
            pokemon2.level_up = pokemon.evolves_to[0].evolution_details[0];
            pokemon2.name = pokemon.evolves_to[0].species.name;
            await api
              .getPokemonInfo(pokemon.evolves_to[0].species.name)
              .then((data) => {
                pokemon2.image = data.sprites.other.dream_world.front_default;
                pokemon2.id = data.id;
              });
            object[2] = pokemon2;
          }
          array[i] = object;
        });
        set_evolution(array);
        set_evolution_loaded(true);
      })
      .catch(() => {
        set_evolution_loaded(true);
      });
  };

  const change_tab = (e, tab) => {
    $("#tabs")
      .children()
      .each(function () {
        $(this).removeClass("active");
      });
    e.target.classList.add("active");
    set_tab(tab);
  };

  const handleOnSearch = (e) => {};

  if (error) {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-bg">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1>oops!</h1>
          <h2>Error 404 : Who's that pokemon ?</h2>
          <div className="notfound-social">
            <TextField
              id="input-with-icon-grid"
              onChange={handleOnSearch}
              label="Search a pokémon"
            />
            <button
              onClick={() => {
                window.location.href =
                  "/" +
                  document
                    .getElementById("input-with-icon-grid")
                    .value.toLowerCase()
                    .trim();
              }}
            >
              Go
            </button>
          </div>
          <Link to="/">go back</Link>
        </div>
      </div>
    );
  }

  if (!pokemon) return <div></div>;

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, " +
          props.template_color[pokemon.types[0].type.name] +
          " 5%, " +
          props.template_color[
            pokemon.types[1]
              ? pokemon.types[1].type.name
              : pokemon.types[0].type.name
          ] +
          " 95%)",
      }}
      className="MoreAboutPokemon"
    >
      <div className="filter-top">
        <div>
          <div className="drawer-btn" onClick={toggleDrawer("top", true)}>
            <SearchIcon />
          </div>
          <Drawer
            anchor={"top"}
            open={state["top"]}
            onClose={toggleDrawer("top", false)}
          >
            {list("top")}
          </Drawer>
        </div>
      </div>
      <div className="top">
        <div className="hder">
          <img
            alt="go back"
            src={row}
            onClick={() => {
              props.history.goBack();
            }}
          />
          <h1>{pokemon.name}</h1>
          <h1>#{("0000" + pokemon.id).slice(-5)}</h1>
        </div>
        <div className="div-pokeball-img">
          <img
            alt="pokeball background"
            className="pokeball-img"
            src={pokeball}
          />
        </div>
        <div className="pokemon-div">
          <div className="change-image">
            {images_list[actualy_image - 1] &&
            image_list_src[actualy_image - 1] ? (
              <div>
                <p>{images_list[actualy_image - 1]}</p>
                <FontAwesomeIcon
                  onClick={() => {
                    set_actualy_image(actualy_image - 1);
                  }}
                  icon={faChevronLeft}
                />
              </div>
            ) : null}
          </div>
          {image_list_src[actualy_image] ? (
            actualy_image === 1 ? (
              <img
                alt={pokemon.name}
                className="pokemon"
                src={image_list_src[actualy_image]}
              />
            ) : (
              <img
                alt={pokemon.name}
                className="pokemon pixel"
                src={image_list_src[actualy_image]}
              />
            )
          ) : (
            <img
              style={{ opacity: "80%", marginRight: 18 }}
              className="pokemon"
              alt={pokemon.image}
              src={unknown_img}
            />
          )}
          <div className="change-image">
            {images_list[actualy_image + 1] &&
            image_list_src[actualy_image + 1] ? (
              <div>
                <FontAwesomeIcon
                  onClick={() => {
                    set_actualy_image(actualy_image + 1);
                  }}
                  icon={faChevronRight}
                />
                <p>{images_list[actualy_image + 1]}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="list-type">
          {pokemon.types.map((type, index) => {
            return <p key={index}>{type.type.name}</p>;
          })}
        </div>
      </div>
      <div className="bot">
        <ul className="nav-more" id="tabs">
          <Tooltip title="All available descriptions" placement="top">
            <li
              onClick={(e) => {
                change_tab(e, 0);
              }}
              className="active"
            >
              About
            </li>
          </Tooltip>
          <Tooltip title="All stats available" placement="top">
            <li
              onClick={(e) => {
                change_tab(e, 1);
              }}
            >
              Base Stats
            </li>
          </Tooltip>
          <Tooltip title="Pre-evolutions and evolutions" placement="top">
            <li
              onClick={(e) => {
                change_tab(e, 2);
              }}
            >
              Evolution
            </li>
          </Tooltip>
          <Tooltip title="All moves it can learn" placement="top">
            <li
              onClick={(e) => {
                change_tab(e, 3);
              }}
            >
              Moves
            </li>
          </Tooltip>
          <Tooltip
            title="Objects it can carry during the capture"
            placement="top"
          >
            <li
              onClick={(e) => {
                change_tab(e, 4);
              }}
            >
              Items
            </li>
          </Tooltip>
        </ul>

        {tab === 0 ? (
          <About
            base_xp={pokemon.base_experience}
            weight={pokemon.weight}
            abilities={pokemon.abilities}
            height={pokemon.height}
            characteristic={characteristic}
            species={species}
          />
        ) : tab === 1 ? (
          <BaseStats stats={pokemon.stats} />
        ) : tab === 2 ? (
          <Evolution
            evolution_loaded={evolution_loaded}
            base_pokemon={pokemon}
            evolution={evolution}
          />
        ) : tab === 3 ? (
          <Moves template_color={props.template_color} moves={moves} />
        ) : tab === 4 ? (
          <Items items={held_items} />
        ) : null}
      </div>
    </div>
  );
}

export default withRouter(MoreAboutPokemon);
