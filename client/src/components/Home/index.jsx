import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BringPokes, bringTypes } from "../../redux/actions";
import { Link } from "react-router-dom";
import { MainInfoPoke } from "../MainInfoPoke/MainInfoPoke";
import Paginado from "./Paginado";
import SearchBar from "../SearcBar/SearchBar";
import {
  sortPokeAction,
  filterOriginAction,
  filterTypeAction,
} from "../../redux/actions";
import "./home.css";
function Home() {
  const dispatch = useDispatch();
  const original = useSelector(state =>state.pokemons)
  const allPokemons = useSelector((state) => state.pokemonsCopy);
  const allTypes = useSelector((state) => state.pokeTypes);
  const notFound = useSelector((state) => state.error);
  const [origin, setOrigin] = useState("All");
  const [loader, setLoader] = useState(true);
  // para el paginado uso estados locales porque siempre esty en la misma pagina
  const [, /*refreshState*/ setRefreshState] = useState(false); // Componente de react que actualiza el store.
  const [currentPage, setCurrentPage] = useState(1); // siempre arranco en la 1
  const [pokemonsPerPage /*setpokemonsPerPage*/] = useState(12); // son 12 por pagina
  const indexOfLastPoke = currentPage * pokemonsPerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokemonsPerPage;
  const currentsPoke = allPokemons.slice(indexOfFirstPoke, indexOfLastPoke); // no incluye al último. Por lo tanto me quedan 12 por pagina

  const setedCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(BringPokes()); // esto es lo mismo que hacer mapdispatchtoprops
    dispatch(bringTypes());
  }, [dispatch]); // Este arreglo es para que no haya llamadas infinitas, acá iria la coindición de hasta cuando va a despachar requesr

  function handleSort(e) {
    e.preventDefault();
    dispatch(sortPokeAction(e.target.value));
    setRefreshState((prevState) => !prevState);
  }
  function handlerFilterOrigin(e) {
    setOrigin(e.target.value);
    dispatch(filterOriginAction(e.target.value));
    setCurrentPage(1);
    setRefreshState((prevState) => !prevState);
  }
  function handlerFilterType(e) {
    dispatch(filterTypeAction(e.target.value, origin));
    setCurrentPage(1);
    setRefreshState((prevState) => !prevState);
  }
  const handlerReload = () => {
    window.location.reload();
  };
  if (currentsPoke && loader) setLoader(false);
  //
  return (
    <div className="home">
      <div className="top-page">
        <SearchBar />
        <Link to="/createpoke">
          <button className="button">Create your own pokémon! </button>
        </Link>
        <img
          src="https://swall.teahub.io/photos/small/96-968581_noted-pokemon-pikachu-and-ash-my-best-friend.jpg"
          alt="Asg&Pika"
        />
      </div>
      <div className="filters">
        <div>
          <select
            defaultValue={"Sort by name"}
            onChange={handleSort}
            className="buttons"
          >
            <option value="Sort by name" selected disabled>
              Sort by name
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>

        <div>
          <select
            defaultValue={"All"}
            onChange={handlerFilterOrigin}
            className="buttons"
          >
            <option value="All" selected disabled>
              Sort by origin
            </option>
            <option value="FromApi">From API</option>
            <option value="FromDataBase">From DataBase</option>
          </select>
        </div>
        <div>
          <select
            onChange={handlerFilterType}
            defaultValue="All"
            className="buttons"
          >
            <option value="All" selected disabled>
              Sort by type
            </option>
            {allTypes.map((type) => {
              return (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <select
            defaultValue={"Sort by attack"}
            onChange={handleSort}
            className="buttons"
          >
            <option value="Sort by attack" selected disabled>
              Sort by attack
            </option>
            <option value="Stronger">Stronger first</option>
            <option value="Weaker"> Weaker first</option>
          </select>
        </div>
        
      </div>
      <button
        className="buttons"
        onClick={(e) => {
          handlerReload(e);
        }}
      >
        Reload Pokémons as default
      </button>
      {original.length > 0 && !loader ? (
        notFound.length === 0 && allPokemons.length>0 ? (
          <div className="card_container">
            {currentsPoke.map((poke) => {
              // console.log()
              return (
                <div key={poke.id}>
                  <MainInfoPoke
                    key={poke.id}
                    id={poke.id}
                    name={poke.name}
                    img={poke.img}
                    type={poke.type}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loaderHome">
          <h1>THERES NO POKEMONS IN THIS AREA...</h1>
          <img src="https://media4.giphy.com/media/jJO1Bwuch5orK/giphy.gif?cid=ecf05e47uf4ia4e52epwpizigvuitw987bumkkeimfgczdaa&rid=giphy.gif&ct=g" alt="travolta" />
        </div>
          
        )
      ) : (
        <div className="loaderHome">
            <img
              src="https://media2.giphy.com/media/nMy8HTFQRWpudNwbxQ/giphy.gif?cid=ecf05e47x29811l114eg1fsrbgq3vbki1375w5sqrqwm1ers&rid=giphy.gif&ct=s"
              alt="Giphy"
            />
            <h1>Searching pokes...</h1>
          </div>
      )}

      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={setedCurrentPage}
      />
    </div>
  );
}
export default Home;
