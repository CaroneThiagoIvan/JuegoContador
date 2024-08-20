import React from 'react';
import './StartButton.css';

function StartButton({ jugando, iniciarJuego }) {
    console.log("jugando: ", jugando);
    console.log("funcion: ", iniciarJuego);
    
    function comprobacionJugando(){
        if (!jugando) {
            iniciarJuego();
        }
    }
    
    return (
        <div className='button-box'>
            <button className='start-button' onClick={comprobacionJugando}>Iniciar Juego</button>
        </div>
    );
}

export default StartButton;