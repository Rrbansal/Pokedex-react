import Search from "../Search/Search"
import './Pokedex.css'
import PokemonList from "../PokemonList/PokemonList"
import { useEffect, useState } from "react";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
function Pokedex()
{
    const [searchterm,setsearchterm]=useState('');

    return(
        <div className="pokedex-wrapper">
        <Search updatesearch={setsearchterm}/>
        {(!searchterm)?<PokemonList/>:<PokemonDetails key={searchterm} pokemonname={searchterm}/>}
        
        </div>
    )

}

export default Pokedex