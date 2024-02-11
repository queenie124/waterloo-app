import React, { useState } from 'react';
import { Stores } from "./stores";
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const redirectToProfile = () => {
        navigate('/Profile');
    }
    const redirectToWheel = () => {
        navigate('/SpinWheel');
    }


    const [query,setQuery]= useState("");
    //console.log(Stores.filter(store=>store.name.toLowerCase().includes(""))); 

    return(
        <div>
            <button type='button' onClick={redirectToProfile}>Profile</button>
            <button type='button' onClick={redirectToWheel}>Spin Wheel</button>
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