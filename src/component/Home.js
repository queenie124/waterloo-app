import React, { useEffect, useState } from 'react';
import { Stores, upsertStore } from "./stores";
import StoreDetail from "./Layout";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from './Navbar';
import './Home.css';
const Home = () => {

    // // updates restaurant table in database
    // useEffect(() => {
    //     Stores.forEach(store => {
    //         checkAndUpdateStore(store);
    //     });
    // }, []);

    const navigate = useNavigate();
    const redirectToHome = () => {
        navigate('/Home');
    }
    const redirectToProfile = () => {
        navigate('/Profile');
    }
    const redirectToWheel = () => {
        navigate('/');
    }

    const [query,setQuery]= useState("");
    //console.log(Stores.filter(store=>store.name.toLowerCase().includes(""))); 

    useEffect(() => {
        upsertStore();
    }, []);

    return (
        <div className='home'>
            <Navbar />
            {/* <div className='navbar'>
                <button type='button' onClick={redirectToHome} id='defaultOpen'>Home</button>
                <button type='button' onClick={redirectToProfile}>Profile</button>
                <button type='button' onClick={redirectToWheel}>Spin Wheel</button>
            </div> */}
            <div className='search-list'>
                <input 
                    type='text'
                    placeholder="search..."
                    className="search"
                    onChange={e => setQuery(e.target.value)}
                />
                <ul className="list"> 
                    {Stores.filter(store => store.name.toLowerCase().includes(query)).map(store => (
                        <li key={store.id} className="listItem">
                            <StoreDetail store={store} />
                        </li>
                    ))}
                </ul>
                {/* <ul className="list"> 
                        {Stores.filter(
                            store => store.name.toLowerCase().includes(query)
                            ).map(
                                (store) => (<li key={store.id} className="listItem"> {store.name} </li>))}
                </ul> */}
            </div>
            {/* <button type='button' onClick={upsertStore}>Upsert Stores</button> */}
        </div>
    );
};

export default Home;