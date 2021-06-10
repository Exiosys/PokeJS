import React, { useEffect, useState } from 'react';
import "../css/Home.css";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import pokeball from "../pokeball.png";
import garbage from "../assets/garbage.png";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Pagination from '@material-ui/lab/Pagination';
import { Skeleton } from '@material-ui/lab';
import unknown_img from "../assets/unknown.png"
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from "jquery";
import { faSortDown, faFilter } from '@fortawesome/free-solid-svg-icons';
import Header from "./Header"
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

export default function Home(props) {

    // States
    const [types, set_types] = useState(props.types);
    const [all_pokemon, set_all_pokemon] = useState(props.all_pokemon ? props.all_pokemon : null);
    const [pokemons, set_pokemons] = useState(all_pokemon ? all_pokemon : null);
    const [loaded, set_loaded] = useState(!!props.loaded);
    const [skeleton_component, set_skeleton_component] = useState([]);
    const [offset, set_offset] = useState(0);
    const [all_move, set_all_move] = useState(props.move ? props.move : false);
    const [all_region, set_all_region] = useState(props.all_region ? props.all_region : false);
    const [value_searched, set_value_searched] = useState(document.URL.split("/")[3] ? document.URL.split("/")[3] : "");
    // State of actuel filter
    const [actual_search_filter, set_actual_search_filter] = useState([]);
    const [actual_move_filter, set_actual_move_filter] = useState([]);
    const [actual_array_move, set_actual_array_move] = useState([]);
    const [actual_type_filter, set_actual_type_filter] = React.useState([]);
    const [actual_region_filter, set_actual_region_filter] = React.useState([]);
    // State of pokemon by filter
    const [poke_by_search, set_pokesearch] = useState([]);
    const [poke_by_move, set_poke_by_move] = useState([]);
    const [poke_by_type, set_poke_by_type] = useState([]);
    const [poke_by_region, set_poke_by_region] = useState([]);
    const [number_displayed, set_number_displayed] = useState(50);
    const [current_page, set_current_page] = useState(1);


    // Variables
    const names = types.map((type) => { return type.name });
    const region_name = all_region;
    const classes = useStyles();

    // Se lance lors de la création du composant / Dès qu'on arrive sur cette page
    useEffect(() => {
        set_all_pokemon(props.all_pokemon);
        set_pokemons(props.all_pokemon);
        set_loaded(props.loaded);
        set_types(props.types);
        set_all_move(props.move);
        set_all_region(props.all_region);
        skeleton_render();

        if ( document.URL.split("/")[3] && loaded)
            handleOnSearch({target: {value :document.URL.split("/")[3]}})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.all_pokemon]);



    const handleOnSearch = (e) => {
        set_offset(1 * number_displayed - number_displayed);
        set_current_page(1);
        set_value_searched(e.target.value);
        let searched = e.target.value.toLowerCase().trim();
        set_actual_search_filter(searched);
        //console.log("actual move filter = " + actual_move_filter);
        //console.log("actual type filter = " + actual_type_filter);
        if (actual_type_filter.length == 0 && (actual_move_filter == null || actual_move_filter.length == 0)) {
            set_pokesearch(all_pokemon.filter(x => x.name.includes(searched)));
            set_pokemons(all_pokemon.filter(x => x.name.includes(searched)));
        }
        else {
            // set_pokesearch(poke_by_type.filter(x => x.name.includes(e.target.value)));
            my_traitment_filter("search", searched);
            //set_pokemons(poke_by_type.filter(x => x.name.includes(e.target.value)));
        }
    }




    // who = search/type/move/region
    const my_traitment_filter = (who, event) => {
        if (who == "search") {
            // console.log("actual move filter = " + actual_move_filter);
            // console.log("actual type filter = " + actual_type_filter);
            // console.log("actual search filter = " + event);
            if (actual_move_filter != null && actual_move_filter.length != 0 && actual_type_filter.length != 0) {
                set_pokemons(poke_by_type.filter(x => (x.more.moves.filter(y => y.move.name === actual_move_filter)).length > 0 ).filter(x => x.name.includes(event)));
                set_pokesearch(poke_by_type.filter(x => (x.more.moves.filter(y => y.move.name === actual_move_filter)).length > 0 ).filter(x => x.name.includes(event)));
            }
            else if ((actual_move_filter == null || actual_move_filter.length == 0) && actual_type_filter.length != 0) {
                set_pokemons(poke_by_type.filter(x => x.name.includes(event)));
                set_pokesearch(poke_by_type.filter(x => x.name.includes(event)));
            }
            else if ((actual_move_filter != null || actual_move_filter.length != 0) && actual_type_filter.length == 0) {
                set_pokemons(poke_by_move.filter(x => x.name.includes(event)));
                set_pokesearch(poke_by_move.filter(x => x.name.includes(event)));
            }
        }
        else if (who === "type") {
            let poke = 0;
            if (event.length === 0) {
                set_pokemons(all_pokemon);
                set_poke_by_type(all_pokemon);
            }
            else if (event.length === 1) {
                console.log("actual search lenght filter = " + actual_search_filter);
                console.log("actual type filter = " + event);
                if (actual_search_filter == '') {
                    set_poke_by_type(all_pokemon.filter(x => (x.more.types[0] && x.more.types[0].type.name === event[0]) || (x.more.types[1] && x.more.types[1].type.name === event[0])));
                    set_pokemons(all_pokemon.filter(x => (x.more.types[0] && x.more.types[0].type.name === event[0]) || (x.more.types[1] && x.more.types[1].type.name === event[0])));
                }
                else if (actual_search_filter != '') {
                    let poke = all_pokemon.filter(x => (x.more.types[0] && x.more.types[0].type.name === event[0]) || (x.more.types[1] && x.more.types[1].type.name === event[0]));
                    console.log(poke.filter(x => x.name.includes(actual_search_filter)));
                    set_poke_by_type(poke);
                    set_pokemons(poke.filter(x => x.name.includes(actual_search_filter)));
                }
            }
            else if (event.length === 2) {  
                    // eslint-disable-next-line no-mixed-operators
                    if (actual_search_filter == '') { 
                        set_poke_by_type(all_pokemon.filter(x => x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === event[0] && x.more.types[1].type.name === event[1] || x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === event[1] && x.more.types[1].type.name === event[0]));
                        set_pokemons(all_pokemon.filter(x => x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === event[0] && x.more.types[1].type.name === event[1] || x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === event[1] && x.more.types[1].type.name === event[0]));
                    }
                    else if (actual_search_filter != '') {
                        let pokepoke = all_pokemon.filter(x => x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === event[0] && x.more.types[1].type.name === event[1] || x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === event[1] && x.more.types[1].type.name === event[0]);
                        console.log(pokepoke.filter(x => x.name.includes(actual_search_filter)));
                        set_poke_by_type(pokepoke);
                        set_pokemons(pokepoke.filter(x => x.name.includes(actual_search_filter)));
                    }
            }
        }
    }

    const handleChangeType = async(event) => {
        set_offset(1 * number_displayed - number_displayed);
        set_current_page(1);
        set_actual_type_filter(event.target.value);
        const ftype = event.target.value;
        if (ftype.length === 0) {
            set_pokemons(all_pokemon);
            set_poke_by_type(all_pokemon);
        }
        if (ftype.length === 1) {
            set_pokemons(all_pokemon.filter(x => (x.more.types[0] && x.more.types[0].type.name === ftype[0]) || (x.more.types[1] && x.more.types[1].type.name === ftype[0])));
            set_poke_by_type(all_pokemon.filter(x => (x.more.types[0] && x.more.types[0].type.name === ftype[0]) || (x.more.types[1] && x.more.types[1].type.name === ftype[0])))
        }
        if (ftype.length === 2) {
            // eslint-disable-next-line no-mixed-operators
            set_pokemons(all_pokemon.filter(x => x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === ftype[0] && x.more.types[1].type.name === ftype[1] || x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === ftype[1] && x.more.types[1].type.name === ftype[0]));
            set_poke_by_type(all_pokemon.filter(x => x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === ftype[0] && x.more.types[1].type.name === ftype[1] || x.more.types[0] && x.more.types[1] && x.more.types[0].type.name === ftype[1] && x.more.types[1].type.name === ftype[0]));
        }
    };

    const handleOnChangePage = (event, value) => {
        set_current_page(value);
        set_offset(value * number_displayed - number_displayed);
    };

    const skeleton_render = () => {
        let array = [];
        for (let i = 0; i < number_displayed; i += 1) {
            array.push(
                <Skeleton key={330 * i} className="pokemon-card-skeleton pokemon-card" variant="rect" width={330} height={200} />
            )
        }
        set_skeleton_component(array);
    }

    const display_filter = (e) => {
        e.stopPropagation();
        $( ".hidden-div").slideToggle();
    }

    const handleChangeMove = (e) => {
        if (e.target.firstChild === null || e.target.firstChild.data == undefined) {
            set_actual_move_filter(null);
            if (poke_by_type.length == 0)
                set_pokemons(all_pokemon);
            else 
                set_pokemons(poke_by_type);
        }
        else {
            let moves = actual_array_move;
            if (actual_array_move == undefined) {
                // console.log("la dedans");
                set_actual_array_move(e.target.firstChild.data);
            }
            else if (actual_array_move != undefined) {
                actual_array_move.push(e.target.firstChild.data);
            }
            // console.log("====move array===")
            // console.log(actual_array_move)
            // console.log("====== end ======")
            myFilterMove();
            // set_actual_move_filter(e.target.firstChild.data);
            // if (poke_by_type.length == 0) {
            //     set_pokemons(all_pokemon.filter(x => (x.more.moves.filter(y => y.move.name === e.target.firstChild.data)).length > 0 ));
            //     set_poke_by_move(all_pokemon.filter(x => (x.more.moves.filter(y => y.move.name === e.target.firstChild.data)).length > 0 ));
            // }
            // else {
            //     set_pokemons(poke_by_type.filter(x => (x.more.moves.filter(y => y.move.name === e.target.firstChild.data)).length > 0 ));
            //     set_poke_by_move(all_pokemon.filter(x => (x.more.moves.filter(y => y.move.name === e.target.firstChild.data)).length > 0 ));
            // }
        }
    }

    const myFilterMove = () => {
        if (actual_array_move.length == 0)
            set_pokemons(all_pokemon);
        else {
            let all = all_pokemon;
            for (let i = 0; i < actual_array_move.length; i++) {
                console.log(actual_array_move[i]);
                all = all.filter(x => (x.more.moves.filter(y => y.move.name === actual_array_move[i])).length > 0 );
            }

            console.log("====tmp array===")
            console.log(all)
            set_pokemons(all);
            set_poke_by_move(all)
            console.log("====== end ======")
        }
    }

    const deleteMoveFromArray = (e) => {
        actual_array_move.splice(e.target.className,1);
        myFilterMove();
    }

    const handleChangeRegion = (e) => {
        set_offset(1 * number_displayed - number_displayed);
        set_current_page(1);
        set_actual_region_filter(e.target.value);
        console.log(all_region);
    }

    const handleOnChangeNumberDisplayed = (e) => {
        set_number_displayed(parseInt(e.target.value));
    }

    const resetFilter = () => {
        actual_array_move.splice(0, 350)
        set_pokemons(all_pokemon);
    }

    // Rendu visible sur la page

    return (
      <div className="Home">
            <div className="input-div">
            <Header />
                <div>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <SearchIcon />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" value={value_searched} onChange={handleOnSearch} label="Search a pokémon" />
                        </Grid>
                    </Grid>
                </div>
            </div>

            <div className="filter-div">
                <div className="filter" onClick={display_filter}>
                    <FontAwesomeIcon icon={faFilter} />
                    <p>Filters</p>
                    <FontAwesomeIcon icon={faSortDown} />
                </div>
                <div className="input-div hidden-div" style={{display: 'none'}}>
                    <div>
                        <InputLabel id="multiple-checkbox-type-label">Type</InputLabel>
                        <Select
                            labelId="multiple-checkbox-type-label"
                            id="multiple-checkbox-type"
                            multiple
                            value={actual_type_filter}
                            onChange={handleChangeType}
                            input={<Input />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}>
                            {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={actual_type_filter.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                    </div>
                    <div>
                        <InputLabel id="multiple-checkbox-region-label">Region</InputLabel>
                        <Select
                            labelId="multiple-checkbox-region-label"
                            id="multiple-checkbox-region"
                            multiple
                            value={actual_region_filter}
                            onChange={handleChangeRegion}
                            input={<Input />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}>
                            {region_name.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={actual_region_filter.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                    </div>
                    <div>
                        <Autocomplete
                            id="country-select-demo"
                            style={{ width: 250 }}
                            options={all_move}
                            onChange={handleChangeMove}
                            classes={{
                                option: classes.option,
                            }}
                            autoHighlight
                            getOptionLabel={(option) => option.name}
                            renderOption={(option) => (
                                <React.Fragment>
                                {/* <span>{countryToFlag(option.code)}</span> */}
                                {option.name}
                                </React.Fragment>
                            )}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose a move"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                            )}
                        />
                        <div class="list-move-choice">{actual_array_move.map((name, index) => {
                                return (<p id="move_list" key={index}>{name} <img className={index} width="15px" height="15px" onClick={deleteMoveFromArray} src={garbage}/></p>)
                            })}
                        </div>
                    </div>

                    <div>
                    <InputLabel id="multiple-checkbox-region-label">Number of item displayed</InputLabel>
                    <Select
                        native
                        value={number_displayed}
                        onChange={(handleOnChangeNumberDisplayed)}
                        >
                        <option value={10}>10</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        </Select>
                    </div>

                    <div>
                        <Button variant="contained" onClick={resetFilter}>Reset</Button>
                    </div>
                </div>
            </div>
        <ul className="list-pokemons">
        {/* .map = foreach */}
        {pokemons && loaded && pokemons.length > 0 ? pokemons.map((pokemon, index) => {
            const type = pokemon.more.types[0].type.name;
            const type2 = pokemon.more.types.length > 1 ? pokemon.more.types[1].type.name : pokemon.more.types[0].type.name
            const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); 
            const id = (('0000' + pokemon.more.id).slice(-5));
            if(index < offset || index > offset - 1 + number_displayed)
                return <div key={index} />;
            // Rendu visible
            return (
                <li className={"pokemon-card"} style={{backgroundImage: 'linear-gradient(to right bottom, ' + props.template_color.[type] + ' 50%, '+ props.template_color.[type2] + ' 50%)'}} key={index}>
                    <Link to={{
                        pathname: "pokemon/" + pokemon.more.id,
                        pokemon: pokemon,
                        color: props.template_color.[type],
                        tag: id
                    }}>
                        <h1>{name}</h1>
                        <h2>#{id}</h2>
                        <img alt="pokeball" className="pokeball-img" src={pokeball} />
                        {pokemon.image ? <img loading="lazy" className="pokemon-img" alt={pokemon.image} src={pokemon.image} /> : <img style={{opacity: "80%", marginRight: 9}} className="pokemon-img" alt={pokemon.image} src={unknown_img} />}
                        <div className="list-type">
                            {pokemon.more.types.map((type, index) => {
                                return (<p key={index}>{type.type.name}</p>)
                            })}
                        </div>
                    </Link>
                </li>
            );
        }) : 
        !loaded ? skeleton_component.map((skeleton, index) => {
            return skeleton;
        }) : <h3 style={{marginLeft:30}}>Pokemon not found ...</h3>
        }
        </ul>
        {pokemons && pokemons.length > 0 ? <Pagination defaultPage={1} page={current_page} onChange={handleOnChangePage} count={pokemons ? Math.ceil(pokemons.length / number_displayed) : 1} showFirstButton showLastButton /> : null}
      </div>
    );
}