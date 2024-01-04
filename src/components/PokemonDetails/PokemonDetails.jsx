import { useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useLayoutEffect, useState } from "react";
import './PokemonDetails.css'
import Others from "../Others/Others";

function PokemonDetails({pokemonname})
{
    const {id} =useParams();
    const [pokemon,setpokemon]=useState({});
    const [otherpokemon,setotherpokemon]=useState([]);
    async function downloadPokemon()
    {
        try{
        let response;
        if(pokemonname)
        {
            response =await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`);
        }else{
         response =await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        }
        setpokemon(
            {
                name:response.data.name,
                image:response.data.sprites.other.dream_world.front_default,
                weight:response.data.weight,
                height:response.data.height,
                types:response.data.types.map((t)=>t.type.name)
            }) 
            const re=await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types?response.data.types[0].type.name:'fire'}`)
            const otpoke=re.data.pokemon.slice(0,5);
            const r=(otpoke.map((ot)=>
            {
                return{
                    name:ot.pokemon.name,
                }
            }));
            setotherpokemon(r);
        }catch(error)
        {
            console.log("something went wrong")
        }
    }

    useEffect(()=>
    {
        downloadPokemon();
    },[])
    return(
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image} alt="" />
            <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
            <div className="pokemon-details-name">height:{pokemon.height}</div>
            <div className="pokemon-details-name">weight:{pokemon.weight}</div>
            <div className="pokemon-details-type">
                {pokemon.types && pokemon.types.map((t)=> <div key={t}>{t}</div>)}
            </div>
            <div>
               { otherpokemon.map((t)=><Others key={t.name} name={t.name}/>)}
                
            </div>
        </div>
    )
    
}

export default PokemonDetails