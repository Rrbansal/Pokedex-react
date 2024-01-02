import { useEffect, useState } from "react";
import axios from 'axios'
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList()
{
    const [pokemonlist,setpokemonlist]=useState([]);
    const [isloading,setisloading]=useState(true);
    const [POKEDEX_URL,setpokedex_url]=useState('https://pokeapi.co/api/v2/pokemon');

    const [next_url,setnext_url]=useState('');
    const [prev_url,setprev_url]=useState('')

    async function downloadpokemon()
    {
        setisloading(true);
        const response=await axios.get(POKEDEX_URL);
        // console.log(response);
        // it has results array it means response
        const pokemon_results=response.data.results;
        setnext_url(response.data.next);
        setprev_url(response.data.previous);
        const pokemon_result_promise=pokemon_results.map((pokemon)=>axios.get(pokemon.url))
        const pokemondata=await axios.all(pokemon_result_promise);
        // console.log(pokemondata)
        const res=(pokemondata.map((pokedata)=>
        {
            const pokemon=pokedata.data;
            return {
                id:pokemon.id,
                name:pokemon.name
                ,image:(pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny
                ,types:pokemon.types}
        }))
        console.log(res);
        setpokemonlist(res);
        setisloading(false);
    }
    // [] mtlb only first time ye hoga jb component load hoga
    useEffect(()=>
    {
        downloadpokemon();
    },[POKEDEX_URL])
   
    return(
        <div className="pokemon-list-wrapper">
            <div className="Pokemon-wrapper">
            {(isloading)?'loading...':
            pokemonlist.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
            </div>
            <div className="controls">
                <button disabled={prev_url==null} onClick={()=>setpokedex_url(prev_url)}>prev</button>
                <button disabled={next_url==null} onClick={()=>setpokedex_url(next_url)}>next</button>
            </div>
        </div>
    )

}
export default PokemonList;

// i have done nom intall axios for downloading or fetchong puropose you can use fetch api also