import React, { useState } from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faBullseye,
  faBurn,
  faDiceTwo,
} from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";

function Moves(props) {
  const [moves, set_moves] = useState(props.moves);

  const display_card = (e) => {
    e.stopPropagation();
    $(".hidden-div" + e.target.id).slideToggle();
  };

  const handleOnSearch = (e) => {
    set_moves(props.moves.filter((x) => x.name.includes(e.target.value)));
  };

  return (
    <div className="Moves">
      {moves && moves.length > 0 ? (
        <div className="div-search-move">
          <TextField
            className="input-search-move"
            onChange={handleOnSearch}
            label="Search a move"
          />
        </div>
      ) : null}
      <div className="info-moves">
        {moves && moves.length > 0 ? (
          moves.map((move, i) => {
            return (
              <div key={i}>
                <div
                  onClick={display_card}
                  style={{ background: props.template_color[move.type] }}
                  id={i}
                  className="card-move"
                >
                  <div>
                    <div className="list-type">
                      <p>{move.type}</p>
                    </div>
                    <label>
                      {move.name.charAt(0).toUpperCase() + move.name.slice(1)}
                    </label>
                  </div>
                  <div
                    className={"hidden-div" + i + " more-info-move"}
                    style={{ display: "none" }}
                  >
                    <div className="info-number">
                      <label>
                        <span>
                          <FontAwesomeIcon icon={faBurn} />
                        </span>
                        Power :{" "}
                        <span className="value">
                          {move.power ? move.power : "N/A"}
                        </span>
                      </label>
                      <label>
                        <span>
                          <FontAwesomeIcon icon={faBolt} />
                        </span>
                        PP :{" "}
                        <span className="value">
                          {move.pp ? move.pp : "N/A"}
                        </span>
                      </label>
                      <label>
                        <span>
                          <FontAwesomeIcon icon={faBullseye} />
                        </span>
                        Accuracy :{" "}
                        <span className="value">
                          {move.accuracy ? move.accuracy : "N/A"}
                        </span>
                      </label>
                      <label>
                        <span>
                          <FontAwesomeIcon icon={faDiceTwo} />
                        </span>
                        Chance :{" "}
                        <span className="value">
                          {move.chance ? move.chance + " %" : "N/A"}
                        </span>
                      </label>
                    </div>
                    <p className="effect">{move.effect}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3 style={{ marginTop: 50 }}>No moves found</h3>
        )}
      </div>
    </div>
  );
}

export default Moves;
