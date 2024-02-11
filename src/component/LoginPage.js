import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';
import '../component/LoginPage.css';
import { emphasize } from "@mui/material";
function LoginPage() {
    const navigate = useNavigate();
    const redirectToSignup = () => {
        navigate('/Signup'); // Use the path you've defined for your SignUp component
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (event) => {
        event.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            console.log("Login Failed")
            return;
        }

        navigate('/Home');
        // const { data: users, error } = await supabase
        //     .from('users')
        //     .select('id, username, email, encrypted_password')
        //     .or(`username.eq.${userNameOrEmail},email.eq.${userNameOrEmail}`)
        //     .single();
        
        // if (error) {
        //     console.error('Error fetching user data:', error);
        //     return;
        // }

        // if (!users) {
        //     console.log('User not found');
        //     return;
        // }

        // const storedPassword = users.encrypted_password;

        // const passwordMatch = await bcrypt.compare(password, storedPassword);

        // if (passwordMatch) {
        //     console.log('Login successful');
        //     setUserInfo({
        //         id: users.id,
        //         username: users.username,
        //         email: users.email,
        //     });

        //     console.log('User ID: ', users.id);
        //     console.log('Username:', users.username);
        //     console.log('Email:', users.email);
        //     navigate('/Home');
        // } else {
        //     console.log('Login failed');
        // }
    }
    return (
        <div className="Loginpage">
             <div id="login-container">
                <h2>Login</h2>
                <form id="login-form" onSubmit={handleLogin}>
                    <input type="text" id="username" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required>
                    </input><br/>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required>
                    </input><br/>
                    <button type="submit">Log in</button><br/>
                    <button type="button" onClick={redirectToSignup}>Sign up</button>
                </form>
             </div>
        </div>
    );
  }

export default LoginPage;