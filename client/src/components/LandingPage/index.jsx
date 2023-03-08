import React from "react";
import { Link } from "react-router-dom";
import Classes from "./Landing.module.css";
function LandingPage() {
  return (
    <div className={Classes.main}>
      <div className={Classes.left}>
        <h1>¡Welcome to Fermin's Pokémon page!</h1>
        <h5>(This was my first web page for Henry's Bootcamp!)</h5>
        <h2>
          <Link to="/home">
            <button className={Classes.button}>Catch'em all !!!</button>
          </Link>
        </h2>
      </div>
      <div className={Classes.right}>
        <img
          className={Classes.img}
          src="https://wallpaperaccess.com/full/133419.jpg"
          alt="Ash&Pikachu"
        />
      </div>
    </div>
  );
}
export default LandingPage;
