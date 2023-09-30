import React, { useState } from 'react'; 
import WheelComponent from "react-wheel-of-prizes";
import { Stores } from "./component/stores"; // Store page
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // React Router
import Layout from './Layout'; // Navigation Layout Page
import Home from './Home'; // Home Page
import Profile from "./Profile"; // Profile Page
import './App.css'; // Main Page Style

// Main Page
function App() {
  const segments = Stores.map(store => (store.name));
  const segColors = Stores.map(store => (store.color)) 
  const onFinished = (winner) => {
      //console.log(winner);
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<Home />}/>
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
    <div className='Wheel'>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        onFinished={(item) => onFinished(item)}
        primaryColor='pink'
        contrastColor='black'
        buttonText='Spin~'
        isOnlyOnce = {false}
        size={200}
        upDuration={1200}
        downDuration={1700}
        fontFamily='Serif'
      />
      </div>
    </div>
  );
};

export default App;
