import React, { useState } from 'react';
import $ from "jquery";

function Items(props) {

  const [items] = useState(props.items);

  const display_card = (e) => {
    e.stopPropagation();
    $( ".hidden-div" + e.target.id ).slideToggle();
  }

  return (
    <div className="Items">
      {items && items.length > 0 ?
      <div className="info-moves">
        {items.map((item,i) => {
          return (
            <div key={i}>
              <div onClick={display_card} id={i} className="card-move">
                <div>
                  <img src={item.image} alt={item.name + " item"} />
                  <label>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</label>
                </div>
                <div className={"hidden-div" + i + " more-info-move"} style={{display: 'none'}}>
                  <h3 style={{fontWeight:700, textAling:"center", width: "100%"}}>{item.price}₽</h3>
                  <p className="effect">{item.text}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      : <h3 style={{marginTop: 50, textAlign: "center"}}>No item available for this Pokémon</h3>}
    </div>
  );
}

export default (Items);