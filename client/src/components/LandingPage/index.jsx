import React from 'react'
import { Link } from 'react-router-dom'
function LandingPage(){
    return(
        <div>

            <h1>¡Welcome to Fermin's Pokémon page!</h1>
            <h2><Link to='/home'>Catch'em all !!!</Link> </h2>
            

        </div>
    )
}
export default LandingPage