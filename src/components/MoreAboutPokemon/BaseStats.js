import React from 'react';
import Progressbar from "./Progressbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessPawn, faCrown, faFistRaised, faHeart, faShieldAlt, faTachometerAlt} from '@fortawesome/free-solid-svg-icons'




function BaseStats(props) {

  return (
    <div className="BaseStats">
        <div className="info-stats">
          <label><span className="icon"><FontAwesomeIcon icon={faHeart} /></span>{(props.stats[0].stat.name).toUpperCase()} : {props.stats[0].base_stat}<span><Progressbar color={"yellow"} value={props.stats[0].base_stat} /></span></label>
          <label><span className="icon"><FontAwesomeIcon icon={faFistRaised} /></span>{(props.stats[1].stat.name).toUpperCase()} : {props.stats[1].base_stat}<span><Progressbar color={"yellow"} value={props.stats[1].base_stat} /></span></label>
          <label><span className="icon"><FontAwesomeIcon icon={faShieldAlt} /></span>{(props.stats[2].stat.name).toUpperCase()} : {props.stats[2].base_stat}<span><Progressbar color={"yellow"} value={props.stats[2].base_stat} /></span></label>
          <label><span className="icon"><FontAwesomeIcon icon={faCrown} /></span>{(props.stats[3].stat.name).toUpperCase()} : {props.stats[3].base_stat}<span><Progressbar color={"yellow"} value={props.stats[3].base_stat} /></span></label>
          <label><span className="icon"><FontAwesomeIcon icon={faChessPawn} /></span>{(props.stats[4].stat.name).toUpperCase()} : {props.stats[4].base_stat}<span><Progressbar color={"yellow"} value={props.stats[4].base_stat} /></span></label>
          <label><span className="icon"><FontAwesomeIcon icon={faTachometerAlt} /></span>{(props.stats[5].stat.name).toUpperCase()} : {props.stats[5].base_stat}<span><Progressbar color={"yellow"} value={props.stats[5].base_stat} /></span></label>
        </div>
        
    </div>
  );
}

export default (BaseStats);