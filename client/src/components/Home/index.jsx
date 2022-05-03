import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { BringPokes, bringTypes } from '../../redux/actions'
import {Link} from 'react-router-dom'
import {MainInfoPoke} from './MainInfoPoke'
import Paginado from './Paginado'
import SearchBar from './SearchBar'
import { sortPokeAction,filterOriginAction,filterTypeAction} from '../../redux/actions'
function Home(){
    const dispatch = useDispatch()
    const allPokemons= useSelector((state) => state.pokemonsCopy)
    const allTypes=useSelector((state) => state.pokeTypes)
    const [origin,setOrigin]= useState('All')
    // para el paginado uso estados locales porque siempre esty en la misma pagina
    const [, /*refreshState*/ setRefreshState] = useState(false); // Componente de react que actualiza el store.
    const [currentPage,setCurrentPage] = useState(1); // siempre arranco en la 1 
    const [pokemonsPerPage,/*setpokemonsPerPage*/]= useState(12); // son 12 por pagina
    const indexOfLastPoke= currentPage * pokemonsPerPage;
    const indexOfFirstPoke= indexOfLastPoke - pokemonsPerPage;
    const currentsPoke = allPokemons.slice(indexOfFirstPoke,indexOfLastPoke) // no incluye al último. Por lo tanto me quedan 12 por pagina 

    const setedCurrentPage= (pageNumber) =>{
        setCurrentPage(pageNumber)
    }  

    useEffect(()=>{
        dispatch(BringPokes()); // esto es lo mismo que hacer mapdispatchtoprops
        dispatch(bringTypes())
    },[dispatch]) // Este arreglo es para que no haya llamadas infinitas, acá iria la coindición de hasta cuando va a despachar requesr 

    function handleSort(e){
        e.preventDefault()
        dispatch(sortPokeAction(e.target.value));
        setRefreshState((prevState) => !prevState);
      };
    function handlerFilterOrigin(e){
        setOrigin(e.target.value)
        dispatch(filterOriginAction(e.target.value));
        setCurrentPage(1);
        setRefreshState((prevState) => !prevState);
      };
    function handlerFilterType(e){
        dispatch(filterTypeAction(e.target.value,origin))
        setCurrentPage(1);
        setRefreshState((prevState) => !prevState);
    }
    const handlerReload = () => {
        window.location.reload();
      };
    
    // 
    return(
        <div>
            <h1>Pokémon !</h1>
            <Link to='/createpoke'>Create your own pokémon!</Link>
           
            <button onClick={e=>{handlerReload(e)}}> Reload Pokémons as default</button>
            <SearchBar/>
            <div>
            <select defaultValue={'Sort by name'} onChange={handleSort}>
                <option value="Sort by name" selected disabled>Sort by name</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
            <select defaultValue={"All"} onChange={handlerFilterOrigin}>
                <option value="All">Sort by origin</option>
                <option value="FromApi">From API</option>
                <option value="FromDataBase">From DataBase</option>
            </select>
            <select onChange={handlerFilterType} defaultValue='All'>
                <option value="All">Sort by type</option>
                {allTypes.map(type=>{
                    return(
                        <option key={type.name} value={type.name}>
                            {type.name}
                        </option>
                    )
                })}
            </select>
            <select defaultValue={"Sort by attack"} onChange={handleSort}> 
                <option value="Sort by attack" selected disabled>Sort by attack</option>
                <option value="Stronger">Stronger first</option>
                <option value="Weaker"> Weaker first</option>
            </select>
            </div>

            <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paginado={setedCurrentPage}
            />
            
            {
                currentsPoke && currentsPoke.map(poke=>{
                    // console.log()
                   return (
                        <MainInfoPoke key={poke.id} id={poke.id} name={poke.name} img={poke.img} type={poke.type}/>
                    )
            })
            }
        </div>
    )
}
export default Home
