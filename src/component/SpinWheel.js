import React from 'react';
import "./SpinWheel.css";
const SpinWheel = () => {
    return (
        <div class="container">
            <div class="spinBtn">
                <div class="wheel">
                    <div class="number" style={{i:1, color: 'blue'}}>
                        <span>100</span>
                    </div>
                    <div class="number" style={{i:2, color: 'red'}}>
                        <span>1</span>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default SpinWheel;