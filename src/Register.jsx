import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setName] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(email); //Email check
        console.log(password); // Password check
        console.log(nickname);
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Nick Name</label>
                <input value={nickname} onChange={(e) => setName(e.target.value)} type="text" placeholder="nick name" id="name" name="name"/>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@email.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </>
    )
}