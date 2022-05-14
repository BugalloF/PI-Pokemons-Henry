import React from "react";
import "./MainInfoPoke.css";
import { Link } from "react-router-dom";
export function MainInfoPoke({ img, name, type, id }) {
  const upperName = name.charAt(0).toUpperCase() + name.slice(1);
  let upperTypes = [];
  for (let i = 0; i < type.length; i++) {
    let typeUpper = type[i].charAt(0).toUpperCase() + type[i].slice(1);
    upperTypes.push(typeUpper);
  }
  return (
    <div className="card">
      <img src={img} alt="Img not found" className="card_img" />
      <h3>{upperName}</h3>
      <h5>Type(s): {upperTypes.join(" && ")}</h5>
      <Link to={`/pokemons/${id}`}>
        <button className="card_button">Specific info</button>
      </Link>
    </div>
  );
}
