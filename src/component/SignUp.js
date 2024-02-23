import React, { useState } from "react";
import '../component/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const redirectToLogin = () => {
        navigate('/Login'); // Use the path you've defined for your SignUp component
    };

    const handleSignup = async (event) => {
        event.preventDefault();

        if (password == confirmPassword) {

            const { user, error } = await supabase.auth.signUp({
                email, // User's email
                password, // User's password
                options: {
                    data: {
                        username: username,
                    }
                }
            });
    
            if (error) {
                alert('Signup failed: ' + error.message);
                console.error('Signup error:', error);
            } else {
                alert('Signup successful, please check your email to verify your account!');
                navigate('/Login'); // Redirect to login after signup
            }
    
            console.log(user, error)

        } else {
            alert('Password does not match.');
        }

    };

    return (
        <div className="SignUp">
            <div id="signup-container">
                <h2>Sign Up</h2>
                <form id="signup-form" onSubmit={handleSignup}>
                    <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <br />
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <br />
                    <input type="password" id="password" placeholder="Comfirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <br />
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <br />
                    <button type="submit">Sign up</button><br />
                    <button type="button" onClick={redirectToLogin}>Already have an account, Log in</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

