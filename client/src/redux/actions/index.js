import { GET_ALL_POKEMONS, GET_TYPES,SORT_POKEMONS,FILTER_BY_ORIGIN,FILTER_BY_TYPE, SEARCH_POKEMON } from "./ActionsTypes";
import axios from 'axios'
export function BringPokes (){
    return async function(dispatch){
        try {
            var getAll= (await axios.get('http://localhost:3001/pokemons')).data
            return dispatch({
             type:GET_ALL_POKEMONS,
             payload:getAll
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}
export function bringTypes(){
    return async function(dispatch){
    const getTypes=(await axios.get('http://localhost:3001/types')).data
    return dispatch(
        {type:GET_TYPES,
            payload:getTypes}
            )}
        }
export function searchAction(name){
    return async function(dispatch){
        let pokeFound= (await axios.get(`http://localhost:3001/pokemons?name=${name}`)).data
        return dispatch({
            type:SEARCH_POKEMON,
            payload:pokeFound
        })
    }

}
export function sortPokeAction(orderBy){
    return {
        type:SORT_POKEMONS,
        payload:orderBy
    };
}
export function filterOriginAction(filterBy){
    return{
        type:FILTER_BY_ORIGIN,
        payload:filterBy
    }
}
export function filterTypeAction(filterBy,origin){
    return{
        type:FILTER_BY_TYPE,
        payload:{filterBy,origin}
    }
}