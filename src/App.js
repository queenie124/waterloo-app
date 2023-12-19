import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // React Router
import Layout from './component/Layout'; // Navigation Layout Page
import Home from './component/Home'; // Home Page
import Profile from "./component/Profile"; // Profile Page
import SpinningWheel from './component/SpinWheel';
import './App.css'; // Main Page Style


// Main Page
function App() {
  
  return (
    <div className="App">
      <SpinningWheel />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
