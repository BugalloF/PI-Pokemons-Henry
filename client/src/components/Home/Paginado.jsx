import React from "react";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        <li>
          {pageNumbers &&
            pageNumbers.map((number) => {
              return (
                <button onClick={() => paginado(number)} key={number}>
                  {number}
                </button>
              );
            })}
        </li>
      </ul>
    </nav>
  );
}
