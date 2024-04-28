import React, { useState } from 'react';
import './SpinWheel.css';
import { Stores } from './stores';

const SpinWheel = () => {
    const [rotation, setRotation] = useState(0);
    const [returnValue, setReturnValue] = useState(null);
    const numStores = Stores.length;
    const sectorAngle = 360 / numStores;
    console.log(sectorAngle);

    const handleSpin = () => {
        const newValue = Math.ceil(Math.random() * 3600);
        setRotation(rotation + newValue);

        const wheelPosition = rotation % 360;
        
        const sectorIndex = Math.floor(wheelPosition / sectorAngle);
        const store = Stores[sectorIndex];
        setReturnValue(store.name);
        console.log(returnValue);
    };

    return (
        <div className="container">
            <div className="spinBtn" onClick={handleSpin}>Spin</div>
            <div className="wheel" style={{ transform: `rotate(${rotation}deg)`, '--num-sectors': Stores.length }}>
                {Stores.map((store, index) => (
                    <div key={store.id} className="sec" style={{ '--i': index + 1, '--clr': store.color }}>
                        <span>{store.name}</span>
                    </div>
                ))}
            </div>
            {returnValue && <p>Selected Store: {returnValue}</p>}
        </div>
    );
};

export default SpinWheel;