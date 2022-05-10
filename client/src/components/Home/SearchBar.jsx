import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {searchAction} from '../../redux/actions'
import './SearchBar.css'
export default function SearchBar(){
    const dispatch = useDispatch()
    const [input,setInput] = useState("")

    function handlerInputChange(e){
        e.preventDefault()
        setInput(e.target.value)
    }
    function handlerSubmit(e){
        e.preventDefault()
        dispatch(searchAction(input))
    }
    return (
        <div className="style">
            <input className="input1" type="text"
            placeholder="Search by PokeName"
            onChange={handlerInputChange} />
            <button type="submit" onClick={handlerSubmit} className='button'>Search!</button>
        </div>
    )
}