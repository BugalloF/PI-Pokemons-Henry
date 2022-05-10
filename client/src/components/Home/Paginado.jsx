import React from "react";
import './paginado.css'
export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="list">
        <li >
          {pageNumbers &&
            pageNumbers.map((number) => {
              return (
                <button onClick={() => paginado(number)} key={number} className="numbers">
                  {number}
                </button>
              );
            })}
        </li>
      </ul>
    </nav>
  );
}
