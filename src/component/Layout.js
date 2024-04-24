import { supabase } from "../supabaseClient";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Attempt to create a new page for the store detail, DOES NOT WORK YET!!!
export const storeDetail = (store) => {
    console.log(store);
    return (
        <div>
            <h1>{store.name}</h1>
            <p>{store.location}</p>
        </div>
    )
}