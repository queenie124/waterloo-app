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
        const { data: { user } } = await supabase.auth.getUser()
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
                {wheelOpen && ( 
                    <WheelComponent
                        isOpen={wheelOpen}
                        segments={segments}
                        segColors={segColors}
                        winningSegment="MM"
                        onFinished={(winner) => onFinished(winner)}
                        primaryColor="black"
                        contrastColor="white"
                        buttonText="Start"
                        isOnlyOnce={false}
                        size={190}
                        upDuration={500}
                        downDuration={600}
                        fontFamily="Helvetica"
                    />
                    )}
            </div>
            
            <div className='popup'>
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                        <Box sx={{ width: 300, height: 200, bgcolor: 'background.paper', borderRadius: '10px' }}>
                            {isLoggedIn ? (
                                <div className='commentForm' style={{ backgroundColor: 'white', padding: '20px' }}>
                                    <form onSubmit={submitHandler}>
                                        <button onClick={handleModalClose} aria-label="Close">
                                            <CloseIcon />
                                        </button>
                                        <div>
                                            <label>
                                                Please enter your comment for {winner} here:
                                            </label>
                                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                                            <Button type="submit">Submit</Button>
                                        </div>
                                    </form>
                                </div>) : (
                                    <div>
                                        <h2>Please sign up to comment for {winner}:</h2>
                                        <button type='button' onClick={redirectToSignup}>Sign Up</button>
                                    </div>
                                    )}
                        </Box>
                </Modal>
            {/* <Modal 
                open={modalOpen} 
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                    {isLoggedIn ? (<div className='commentForm' style={{ backgroundColor: 'white', padding: '20px' }}>
                    <form onSubmit={submitHandler}>
                        <button onClick={handleModalClose} aria-label="Close">
                                <CloseIcon />
                        </button>
                        <div>
                        <label>
                        Please enter your comment for {winner} here:
                        </label>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </div>) : (<div><p>User not Logged In</p></div>)}
            </Modal> */}

            {/* <div>
                <Router>
                    <Routes>
                        <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='profile' element={<Profile />} />
                        </Route>
                    </Routes>
                </Router>
            </div> */}

            </div>
        </div> 
    )
};

export default SpinningWheel;