import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

const Profile = () => {
    const [currentForm, setCurrentForm] = useState('login');
    const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="profilePage">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }
      </div>
  )
};

export default Profile;