import { useState } from 'react';
import './Search.css'
import usedebounce from '../../hooks/usedebounce';
function Search({updatesearch})
{
    const debouncecallback=usedebounce((e)=>updatesearch(e.target.value));
    return(
        <div className="search-wrapper">
        <input type="text" name="" id="pokemon-name-search" placeholder="pokemon name" onChange={debouncecallback} />
        </div>
    )

}

export default Search;