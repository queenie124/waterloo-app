import React, { Component } from 'react';
import "./SpinWheel.css";
import { Stores } from './stores';
import WheelComponent from "react-wheel-of-prizes";

const SpinningWheel = () => {
    const segments = Stores.map(store => (store.name));
    const segColors = Stores.map(store => (store.color))

    const onFinished = (winner) => {
        console.log(winner)
    };

    return (
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
    )
};

export default SpinningWheel;