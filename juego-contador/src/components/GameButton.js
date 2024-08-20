import React from 'react';
import './GameButton.css';

function GameButton({ incrementarContador }) {
    return (
        <div className='button-box'>
            <button className='game-button' onClick={incrementarContador}>CLICK</button>
        </div>
    );
}

export default GameButton;