import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/');
  }
  const redirectToWheel = () => {
    navigate('/SpinWheel');
  }
  const redirectToSignup = () => {
    navigate('/Signup')
  }

  // const [currentForm, setCurrentForm] = useState('login');
  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }
  return (
    <div className="profilePage">
      <button type='button' onClick={redirectToHome}>Home</button>
      <button type='button' onClick={redirectToWheel}>Spin Wheel</button>
      <button type="button" onClick={redirectToSignup}>Log-in / Sign-up</button>
      </div>
  )
};

export default Profile;