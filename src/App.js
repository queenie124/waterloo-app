import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router
import Home from './component/Home'; // Home Page
import SignUp from './component/SignUp';
import LoginPage from './component/LoginPage';
import Profile from "./component/Profile"; // Profile Page
import SpinningWheel from './component/SpinWheel';
import AccountForm from './component/AccountForm';
import './App.css'; // Main Page Style


// Main Page
function App() {
  
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<SpinningWheel />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/AccountForm" element={<AccountForm />} />
        </Routes>
      </Router>
    </div>
  )

  // return (
  //   <div className="App">
  //     <div className="Wheel">
  //       <SpinningWheel />
  //     </div>
  //     <div>
  //       <BrowserRouter>
  //         <Routes>
  //           <Route path='/' element={<Layout />}>
  //             <Route index element={<Home />} />
  //             <Route path='profile' element={<Profile />} />
  //           </Route>
  //         </Routes>
  //       </BrowserRouter>
  //     </div>
  //   </div>
  // );
};

export default App;
