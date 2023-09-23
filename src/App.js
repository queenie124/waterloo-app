//Trial Comment

import React, { useState } from 'react';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { Stores } from "./component/stores";
 

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  
  const [query,setQuery]= useState("fl");
  console.log(Stores.filter(store=>store.name.toLowerCase().includes("fl"))); 
  return (
    <div className="App">
      <div className="loginpage">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }
      </div>
    
      <input 
        type='text'
        placeholder="search..."
        className="search"
        onChange={e => setQuery(e.target.value)}/> 
      <ul className="list"> 
        {Stores.filter(store=>store.name.toLowerCase().includes(query)
        ).map((store)=> (
          <li key={store.id}className="listItem">{store.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
