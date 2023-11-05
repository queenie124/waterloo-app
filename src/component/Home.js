import React, { useState } from 'react';
import { Stores } from "./stores";
const Home = () => {
    
    const [query,setQuery]= useState("");
    //console.log(Stores.filter(store=>store.name.toLowerCase().includes(""))); 

    return(
        <div>
            <input 
                type='text'
                placeholder="search..."
                className="search"
                onChange={e => setQuery(e.target.value)}/> 
            <ul className="list"> 
                {Stores.filter(
                    store => store.name.toLowerCase().includes(query)
                    ).map(
                        (store) => (<li key={store.id} className="listItem"> {store.name} </li>))}
            </ul>


        </div>
        
    )
};

export default Home;