import {
  GET_ALL_POKEMONS,
  GET_TYPES,
  SORT_POKEMONS,
  FILTER_BY_ORIGIN,
  FILTER_BY_TYPE,
  SEARCH_POKEMON,
  POST_POKEMON,
  GET_DETAIL,
  CLEAR_STATE,
  ERROR,
  CLEAR_HOME,
  DELETE_POKE,
} from "./ActionsTypes";
import axios from "axios";
export function BringPokes() {
  return async function (dispatch) {
    try {
      var getAll = (await axios.get("https://pokeapp70.herokuapp.com/pokemons")).data;
      return dispatch({
        type: GET_ALL_POKEMONS,
        payload: getAll,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function bringTypes() {
  return async function (dispatch) {
    const getTypes = (await axios.get("https://pokeapp70.herokuapp.com/types")).data;
    return dispatch({ type: GET_TYPES, payload: getTypes });
  };
}
export function searchAction(name) {
  return async function (dispatch) {
    try {
      let pokeFound = (
        await axios.get(
          `https://pokeapp70.herokuapp.com/pokemons/nombre?name=${name.toLocaleLowerCase()}`
        )
      ).data;
      // console.log(pokeFound)
      return dispatch({
        type: SEARCH_POKEMON,
        payload: pokeFound,
      });
      //}
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: "No results founds",
      });
      console.log(error);
    }
  };
}
export function sortPokeAction(orderBy) {
  return {
    type: SORT_POKEMONS,
    payload: orderBy,
  };
}
export function filterOriginAction(filterBy) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: filterBy,
  };
}
export function filterTypeAction(filterBy, origin) {
  return {
    type: FILTER_BY_TYPE,
    payload: { filterBy, origin },
  };
}
export function postPokemon(payload) {
  return async function () {
    const create = await axios.post("https://pokeapp70.herokuapp.com/pokemons", payload);
    return {
      type: POST_POKEMON,
      payload: create,
    };
  };
}
export function getDetails(id) {
  return async function (dispatch) {
    const pokeDetail = (await axios.get(`https://pokeapp70.herokuapp.com/pokemons/${id}`))
      .data;
    return dispatch({
      type: GET_DETAIL,
      payload: pokeDetail,
    });
  };
}
export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}
export function clearHome() {
  return {
    type: CLEAR_HOME,
  };
}
export function deletePokemon(id) {
  return async function (dispatch) {
    await axios.delete(`https://pokeapp70.herokuapp.com/pokemons/${id}`);
    return dispatch({
      type: DELETE_POKE,
    });
  };
}
