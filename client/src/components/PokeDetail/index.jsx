import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDetails, clearState, deletePokemon } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import "./Detail.css";
function PokeDetail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
    return () => {
      //codigo para cuando quiero desmontar el componente
      dispatch(clearState());
    };
  }, [dispatch, props.match.params.id]);
  let poke = useSelector((state) => state.pokeDetail);
  console.log(poke);
  function handlerDelete() {
    dispatch(deletePokemon(poke[0].id));
    history.push("/home");
    alert("Pokemon deleted !");
  }
  return (
    <div>
      {poke.length ? (
        <div className="main">
          {/* <img src="  " alt="PokeDetail" className="pic"/>  */}

          <div className="pokeContainer">
            <div>
              <h1>
                {poke[0].name.charAt(0).toUpperCase() + poke[0].name.slice(1)}
              </h1>
              <img src={poke[0].img} alt="Pokepic" className="pokepic" />
              <h4>Id: {poke[0].id}</h4>
            </div>
            <div className="stats_container">
              <div className="stats">
                <h4>Hp: {poke[0].hp}</h4>
                <h4>Attack: {poke[0].attack}</h4>
                <h4>Defense: {poke[0].defense}</h4>
              </div>
              <div className="stats">
                <h4>Speed: {poke[0].speed}</h4>
                <h4>Height: {poke[0].height}</h4>
                <h4>Weight: {poke[0].weight}</h4>
              </div>
            </div>
            <h4>
              Type(s):
              {poke[0].type
                .map((e) => {
                  return e.charAt(0).toUpperCase() + e.slice(1);
                })
                .join(" && ")}
            </h4>
            <Link to="/home">
              <button className="btn_home">Home</button>
            </Link>
            {typeof poke[0].id === "string" ? (
              <button className="btn_home" onClick={handlerDelete}>
                DELETE
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ) : (
        <div className="loaderDetail"></div>
      )}
    </div>
  );
}

export default PokeDetail;
