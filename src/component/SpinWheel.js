import React, { Component, useState } from 'react';
import "./SpinWheel.css";
import { Stores } from './stores';
import WheelComponent from "react-wheel-of-prizes";
import { Box, Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const SpinningWheel = () => {
    // Spin Wheel
    const segments = Stores.map(store => (store.name));
    const segColors = Stores.map(store => (store.color));
    const [finished, setFinish] = useState(false);
    const [winner, setWinner] = useState("");
    const onFinished = (winner) => {
        setFinish(true)
        setWinner(winner)
        handleOpen()
    };

    // Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [comment, setComment] = useState("");
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(comment);
    };

    return (
        /* Spin and show popup*/
        <div className='Spin-popup'>
            <div className="Wheel">
                <WheelComponent
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
            </div>
            
            <div className='popup'>
                <Modal
                    open={open}
                    //onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box>
                        <button onClick={handleClose} aria-label="Close">
                            <CloseIcon />
                        </button>
                        <div className="CommentPage">
                            <div className="CommentForm">
                                <form onSubmit={submitHandler}>
                                <label>
                                Please enter your comment for {winner} here:
                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                                </label>
                                <button type="submit" onClick={handleClose}>Submit</button>
                            </form>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
        
    )
};

export default SpinningWheel;