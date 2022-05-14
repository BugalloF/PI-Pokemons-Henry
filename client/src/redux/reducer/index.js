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
} from "../actions/ActionsTypes";
import { sortPoke, filterPoke, filterByType } from "./utils";
const initialState = {
  pokemons: [],
  pokemonsCopy: [],
  APIpokes: [],
  DBpokes: [],
  pokeTypes: [],
  pokeDetail: [],
  error: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopy: action.payload,
        APIpokes: filterPoke("FromApi", action.payload),
        DBpokes: filterPoke("FromDataBase", action.payload),
      };
    case GET_TYPES:
      return {
        ...state,
        pokeTypes: action.payload,
      };
    case SORT_POKEMONS:
      return {
        ...state,
        pokemonsCopy: sortPoke(action.payload, state.pokemonsCopy),
      };
    case FILTER_BY_ORIGIN:
      return {
        ...state,
        pokemonsCopy: filterPoke(action.payload, state.pokemons),
      };
    case FILTER_BY_TYPE:
      return {
        ...state,
        pokemonsCopy: filterByType(
          action.payload.filterBy,
          action.payload["origin"] === "FromApi"
            ? state.APIpokes
            : action.payload["origin"] === "FromDataBase"
            ? state.DBpokes
            : state.pokemons
        ),
      };
    case SEARCH_POKEMON:
      return {
        ...state,
        pokemonsCopy: action.payload,
      };
    case POST_POKEMON:
      return {
        ...state,
      };
    case GET_DETAIL:
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case CLEAR_STATE:
      return {
        ...state,
        pokeDetail: [],
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_HOME:
      return {
        ...state,
        pokemons: [],
        pokemonsCopy: [],
      };
    case DELETE_POKE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
