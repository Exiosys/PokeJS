import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Evolution(props) {
  const [evolution_loaded, set_evolution_loaded] = useState(
    props.evolution_loaded
  );
  const [evolution, set_evolution] = useState(
    props.evolution ? props.evolution : []
  );

  useState(() => {
    set_evolution(props.evolution);
    set_evolution_loaded(props.evolution_loaded);
  }, [props.evolution_loaded, props.evolution]);

  return (
    <div className="Evolution">
      {evolution_loaded ? (
        evolution.length > 0 ? (
          evolution.map((pokemon, i) => {
            return (
              <div key={i} className="pokemon-evolution">
                {pokemon.map((poke, i) => {
                  var results = [];
                  if (poke.level_up) {
                    for (const [key, value] of Object.entries(poke.level_up)) {
                      if (value)
                        results.push({
                          key: key,
                          value: value.name ? value.name : value,
                        });
                    }
                  }

                  return (
                    <div key={i} className="d-flex pokemon-evolution-container">
                      {i > 0 ? (
                        <div className="arrow">
                          <p className="explication-evolution">
                            {results.reverse().map((info, i) => {
                              return (
                                <span key={i}>
                                  {" "}
                                  {info.key}{" "}
                                  <strong>
                                    {i === 0 ? "by" : "("} {info.value}{" "}
                                    {i === 0 ? null : ")"}
                                  </strong>{" "}
                                  {i !== results.length - 1 ? "and" : null}{" "}
                                </span>
                              );
                            })}
                          </p>
                          <FontAwesomeIcon
                            className="icon"
                            icon={faArrowRight}
                          />
                        </div>
                      ) : null}
                      <div
                        onClick={() => {
                          window.location.href = "/pokemon/" + poke.id;
                        }}
                      >
                        <img src={poke.image} alt={poke.name} />
                        <h1>{poke.name}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <h3 style={{ marginTop: 100 }}>
            No evolution available for this pokémon
          </h3>
        )
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
}

export default Evolution;
