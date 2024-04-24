import React, { useState } from "react";
import { supabase } from "../supabaseClient";

// Currently working on the form
const AccountForm = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    
}

export default AccountForm;