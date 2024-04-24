import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const redirectToHome = () => {
    navigate('/Home');
  }
  const redirectToProfile = () => {
    navigate('/Profile');
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
      console.log("Sign out successful");
      redirectToSignup();
    }
  }
  // Get user information

  const [userInfo, setUserInfo] = useState({});
  const fetchUser = async () => {
    const {data: { user }} = await supabase.auth.getUser();
    // if (user) {
    //   console.log("user", user);
    // } else {
    //   console.log("user not found");
    // }
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) {
        console.log("error", error);
      } else {
        //console.log("data", data);
        setUserInfo(data); // Store the fetched user data in the userInfo state
      }
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  console.log("userInfo", userInfo);
  console.log("userInfo.username", userInfo.username);

  // console.log("id", user.id);


  // const [currentForm, setCurrentForm] = useState('login');
  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }
  return (
    <div className="profile-page">
      <div className="navbar">
        <button type='button' onClick={redirectToHome}>Home</button>
        <button type='button' onClick={redirectToProfile}>Profile</button>
        <button type="button" onClick={handleSignOut}>Sign Out</button>
      </div>

      <div className="profile">
        <h1>Profile</h1>
        <div className="profile-info">
          <p>Username: {userInfo.username}</p>
          <p>Id: {userInfo.id}</p>
        </div>
      </div>

    </div>
  )
};

export default Profile;