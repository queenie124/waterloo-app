import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import "./SpinWheel.css";
import { Stores } from './stores';
// import Layout from './Layout';
// import Home from './Home';
// import Profile from './Profile';
import WheelComponent from "react-wheel-of-prizes";
import { Box, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { supabase } from '../supabaseClient';
import { red } from '@mui/material/colors';


const SpinningWheel = () => {
    const navigate = useNavigate();
    const redirectToSignup = () => {
        navigate('/Signup');
    };
    const redirectToHome = () => {
        navigate('/Home');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserLoggedIn = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        handleModalOpen();
    }; 
    
    // Spin Wheel
    const [wheelOpen, setWheelOpen] = useState(true);
    const segments = Stores.map(store => (store.name));
    const segColors = Stores.map(store => (store.color));
    const [winner, setWinner] = useState("");
    const onFinished = (winner) => {
        setWinner(winner);
        checkUserLoggedIn();
    };

    const closeWheel = () => setWheelOpen(false);
    
    // Modal
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    
    // Comment
    const [comment, setComment] = useState("");
    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(comment);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            console.log("user", user);
        } else {
            console.log("user not found");
        }
        try {
            const { error } = await supabase
            .from('comments')
            .insert({ 
                restaurant_id: await getRestaurantId(winner), 
                comment: comment,
                user_id: user.id,
            })
            if (error) {
                console.log("error1", error);
                throw error;
            }
            else {
                console.log("comment inserted.");
            }
        } catch (error) {
            console.error('Error inserting comment:', error.message);
        }
        setComment('');
        handleModalClose();
        redirectToHome();
    };

    const getRestaurantId = async (restaurantName) => {
        const { data, error } = await supabase
        .from('restaurants')
        .select('restaurant_id')
        .eq('restaurant_name', restaurantName);
        if (error) {
            console.log("error", error);
            throw error;
        }
        else {
            console.log("restaurant_id", data[0].restaurant_id);
            console.log("typeof", typeof(data[0].restaurant_id));
            return data[0].restaurant_id;
        }
    }
    
    return (
        /* Spin and show popup*/
        <div className='Spin-popup'>
            <div className="Wheel">
                {/* {wheelOpen && (  */}
                    <WheelComponent
                        isOpen={wheelOpen}
                        segments={segments}
                        segColors={segColors}
                        winningSegment=""
                        onFinished={(winner) => onFinished(winner)}
                        primaryColor="black"
                        contrastColor="white"
                        buttonText="Start"
                        isOnlyOnce={false}
                        size={200}
                        upDuration={500}
                        downDuration={600}
                        fontFamily="Arial"
                    />
                    {/* )} */}
            </div>
            
            <div className='popup'>
                <Modal
                    open={modalOpen}
                    //onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '100vh' 
                        }}
                    >
                        {isLoggedIn ? (
                            <div>
                                <form onSubmit={submitHandler}>
                                    <div className='commentForm'>
                                        <div className='formTop'>
                                            <div className='formlabel'>
                                                <label>
                                                    Please enter your comment for {winner} here:
                                                </label>
                                            </div>
                                            <div id='close-popup'>
                                                <button onClick={handleModalClose} aria-label="Close">
                                                    <CloseIcon />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='formInput'>
                                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} required/>
                                        </div>
                                        <div id='submitButton'>
                                            <Button type="submit">Submit</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>) : (
                                <div className='signupNotice'>
                                    <h2>Please sign-in to comment for {winner}:</h2>
                                    <button type='button' onClick={redirectToSignup}>Sign-in</button>
                                </div>
                                )}
                    </Box>
                </Modal>
            </div>
        </div> 
    )
};

export default SpinningWheel;