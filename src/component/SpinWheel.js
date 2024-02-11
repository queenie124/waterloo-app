import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import "./SpinWheel.css";
import { Stores } from './stores';
import Layout from './Layout';
import Home from './Home';
import Profile from './Profile';
import WheelComponent from "react-wheel-of-prizes";
import { Box, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const SpinningWheel = () => {
    const navigate = useNavigate();
    const handleSubmitClick = () => {
        navigate('/Signup');
    }

    // Spin Wheel
    const [wheelOpen, setWheelOpen] = useState(true);
    const segments = Stores.map(store => (store.name));
    const segColors = Stores.map(store => (store.color));
    const [winner, setWinner] = useState("");
    const onFinished = (winner) => {
        setWinner(winner);
        handleModalOpen();
    };

    const closeWheel = () => {
        setWheelOpen(false);
    }

    // Modal
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const [comment, setComment] = useState("");
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(comment);
        setComment('');
        handleModalClose();
        handleSubmitClick();
    };
    
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
                </div>
            </Modal>

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