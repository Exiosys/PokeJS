import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRuler,
  faChartBar,
  faWeightHanging,
  faBox,
  faLaughBeam,
  faInfoCircle,
  faEgg,
  faDumbbell,
  faStar,
  faPlane,
  faHatCowboy,
  faHome,
  faSeedling,
  faAtom,
} from "@fortawesome/free-solid-svg-icons";
import Fade from "@material-ui/core/Fade";

function About(props) {
  return (
    <div className="About">
      <Fade in={true}>
        <div className="info-about">
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faChartBar} />
            </span>
            Base experience : <span>{props.base_xp} XP</span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faRuler} />
            </span>
            Height : <span>{props.height / 10} m</span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faWeightHanging} />
            </span>
            Weight : <span>{props.weight / 10} kg</span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faLaughBeam} />
            </span>
            Base hapiness :{" "}
            <span>{props.species ? props.species.base_happiness : "None"}</span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faBox} />
            </span>
            Catch rate :{" "}
            <span>
              {props.species
                ? Math.ceil((props.species.capture_rate / 255) * 100)
                : "None"}
              %
            </span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faAtom} />
            </span>
            Abilities :{" "}
            <span>
              {props.abilities && props.abilities.length > 0
                ? props.abilities.map((ability, i) => (
                    <span key={i}>
                      {i > 0 ? "," : null} {ability.ability.name}
                    </span>
                  ))
                : "None"}
            </span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>
            Charateristic :{" "}
            <span>
              {props.characteristic
                ? props.characteristic.descriptions[2].description
                : "None"}
            </span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faEgg} />
            </span>
            Egg group :{" "}
            <span>
              {props.species &&
              props.species.egg_groups &&
              props.species.egg_groups.length > 0
                ? props.species.egg_groups.map((egg, i) => (
                    <span key={i}>
                      {i > 0 ? "," : null} {egg.name}
                    </span>
                  ))
                : "None"}
            </span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faDumbbell} />
            </span>
            Highest Stat :{" "}
            <span>
              {props.characteristic
                ? props.characteristic.highest_stat.name
                : "None"}
            </span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faPlane} />
            </span>
            Family :{" "}
            <span>
              {props.species && props.species.genera[7]
                ? props.species.genera[7].genus
                : "None"}
            </span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faHatCowboy} />
            </span>
            Generation :{" "}
            <span>
              {props.species ? props.species.generation.name : "None"}
            </span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faHome} />
            </span>
            Habitat :{" "}
            <span>
              {props.species && props.species.habitat
                ? props.species.habitat.name
                : "None"}
            </span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faSeedling} />
            </span>
            Growth rate :{" "}
            <span>
              {props.species && props.species.growth_rate
                ? props.species.growth_rate.name
                : "None"}
            </span>
          </label>
          <label>
            <span className="icon">
              <FontAwesomeIcon icon={faStar} />
            </span>
            Flavor text :{" "}
            <span>
              {props.species
                ? props.species.flavor_text_entries.find(
                    (x) => x.language.name === "en"
                  ).flavor_text
                : "Unvalaible flavor text in english"}
            </span>
          </label>
        </div>
      </Fade>
    </div>
  );
}

export default About;
