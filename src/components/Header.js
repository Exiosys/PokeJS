import React from 'react';
import "../css/Header.css";
import logo from "../assets/psyduck.png"

export default function Header(props) {

    return (
      <div className="Header">
          {props.logo ? <img style={{cursor: "pointer"}} onClick={() => {window.location.href = "/"}} alt="logo" src={logo} /> : null}
          <h1 style={props.logo ? null : {paddingLeft:60}}>Poke<span className="red">JS</span></h1>
      </div>
    );
}