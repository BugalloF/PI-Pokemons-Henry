import React, { useEffect, useState } from "react";
import { postPokemon, bringTypes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { validate } from "./validate";
import "./Create.css";
export function CreatePoke() {
  const history = useHistory();
  const dispatch = useDispatch();
  const types = useSelector((state) => state.pokeTypes);
  useEffect(() => {
    dispatch(bringTypes());
  }, [dispatch]);
  const [input, setInput] = useState({
    img: "",
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: [],
  });
  const [errors, setErrors] = useState({});

  const preventDefault = (e) => e.preventDefault();

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleCheckBox(e) {
    const clicked = types
      .filter((t) => e.target.value === t.name)
      .map((t) => t.name);
    if (e.target.checked) {
      setInput({
        ...input,
        type: [...input.type, ...clicked],
      });
      setErrors(
        validate({
          ...input,
          type: [...input.type, ...clicked],
        })
      );
    } else {
      setInput({
        ...input,
        type: input.type.filter((e) => e !== clicked[0]),
      });
      setErrors(
        validate({
          ...input,
          type: input.type.filter((e) => e !== clicked[0]),
        })
      );
    }
  }
  function handleSubmit() {
    dispatch(postPokemon(input));
    setInput({
      img: "",
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      type: [],
    });
    alert("Pokemon created succesfully");
    history.push("/home");
  }
  return (
    <div className="mainCreate">
      <img
        src="https://i.pinimg.com/564x/0a/07/99/0a07998f4f47b6f46e83d7c00dfe20a0.jpg"
        alt="Pokeballs"
        className="imgCreate"
      />

      <form onSubmit={preventDefault}>
        <div className="right">
          <div className="form">
            <Link to="/home">
              <button className="buttonCreate">HOME</button>
            </Link>
            <div className="input">
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                placeholder={`Pokemon's name`}
                name="name"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                className={errors.name && "error"}
              />
            </div>
            <div className="input">
              <label>Hp:</label>
              <input
                type="number"
                value={input.hp}
                name="hp"
                placeholder={`Pokemon's HP (1-99)`}
                onChange={(e) => handleInputChange(e)}
                className={errors.hp && 'error'}
              />
            </div>
            <div className="input">
              <label>Attack:</label>
              <input
                type="number"
                value={input.attack}
                name="attack"
                placeholder={`Pokemon's attack (1-99)`}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="input">
              <label>Defense:</label>
              <input
                type="number"
                value={input.defense}
                name="defense"
                onChange={handleInputChange}
                placeholder={`Pokemon's defense (1-99)`}
              />
            </div>
            <div className="input">
              <label>Speed:</label>
              <input
                type="number"
                placeholder={`Pokemon's speed (1-99)`}
                value={input.speed}
                name="speed"
                onChange={handleInputChange}
              />
            </div>
            <div className="input">
              <label>Height:</label>
              <input
                type="number"
                value={input.height}
                name="height"
                placeholder={`Pokemon's height (1-199)`}
                onChange={handleInputChange}
              />
            </div>
            <div className="input">
              <label>Weight:</label>
              <input
                type="number"
                value={input.weight}
                name="weight"
                onChange={handleInputChange}
                placeholder={`Pokemon's weight (1-199)`}
              />
            </div>
            <div className="input">
              <label>Image:</label>
              <input
                type="text"
                value={input.img}
                name="img"
                onChange={handleInputChange}
                placeholder={`URL`}
              />
            </div>
            <div className="typesContainer">
              {types.map((e, i) => {
                return (
                  <label key={i} value={e.name} className="input">
                    {e.name.charAt(0).toUpperCase()}
                    {e.name.slice(1)}
                    <input
                      type="checkbox"
                      value={e.name}
                      onChange={handleCheckBox}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {errors.name || errors.type ? (
            <div className="errorContainer">
              <h3>Errors:</h3>
              {errors.name && <p>{errors.name}</p>}
              <p>Red fields is required</p>
              <p>1 or 2 types allowed</p>
            </div>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="buttonCreate"
            >
              Create !
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default CreatePoke;
