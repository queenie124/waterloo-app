import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/Home');
  }
  const redirectToSignup = () => {
    navigate('/Signup')
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Sign out failed: ", error.message);
      return;
    } else {
      redirectToSignup();
    }
  }

  // const [currentForm, setCurrentForm] = useState('login');
  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }
  return (
    <div className="profilePage">
      <button type='button' onClick={redirectToHome}>Home</button>
      <button type="button" onClick={handleSignOut}>Sign Out</button>
      </div>
  )
};

export default Profile;