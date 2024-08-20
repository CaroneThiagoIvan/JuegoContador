import './App.css';
import StartButton from './components/StartButton';
import React, { useState, useEffect } from 'react';
import GameButton from './components/GameButton';

function App() {
  const [contador, setContador] = useState(0);
  const [jugando, setJugando] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [mostrarBotonJuego, setMostrarBotonJuego] = useState(false);
  const [highscore, setHighscore] = useState(0);
  const [mostrarHighscore, setMostrarHighscore] = useState(false);
  const [cuentaRegresiva, setCuentaRegresiva] = useState(null);

  useEffect(() => {
    let timer;
    if (tiempoRestante > 0) {
      timer = setInterval(() => {
        setTiempoRestante((tiempo) => tiempo - 1);
      }, 1000);
    } else if (tiempoRestante === 0 && mostrarBotonJuego) {
      setMostrarBotonJuego(false);
      setJugando(false);
      setMostrarHighscore(true);
    }
    return () => clearInterval(timer);
  }, [tiempoRestante, mostrarBotonJuego]);

  useEffect(() => {
    let countdownTimer;
    if (cuentaRegresiva !== null) {
      if (cuentaRegresiva > 0) {
        countdownTimer = setInterval(() => {
          setCuentaRegresiva((prev) => prev - 1);
        }, 1000);
      } else if (cuentaRegresiva === 0) {
        setMostrarBotonJuego(true);
        setTiempoRestante(5);
        setCuentaRegresiva(null);
      }
    }
    return () => clearInterval(countdownTimer);
  }, [cuentaRegresiva]);

  const incrementarContador = () => {
    setContador((viejoContador) => {
      const nuevoContador = viejoContador + 1;
      if (nuevoContador > highscore) {
        setHighscore(nuevoContador);
      }
      return nuevoContador;
    });
  };

  const iniciarJuego = () => {
    setJugando(true);
    setContador(0);
    setMostrarBotonJuego(false);
    setMostrarHighscore(false);
    setCuentaRegresiva(3);
  };

  const renderCuentaRegresiva = () => {
    switch (cuentaRegresiva) {
      case 3:
        return <p className='count'>Preparados...</p>;
      case 2:
        return <p className='count'>Listos...</p>;
      case 1:
        return <p className='count'>¡YA!</p>;
      default:
        return null;
    }
  };

  return (
    <div>
      {!jugando && (
        <>
          <StartButton
            jugando={jugando}
            iniciarJuego={iniciarJuego}
          />
          <p>Record: {highscore}</p>
        </>
      )}
      {cuentaRegresiva !== null ? (
        renderCuentaRegresiva()
      ) : mostrarBotonJuego ? (
        <>
          <GameButton
            incrementarContador={incrementarContador}
          />
          <p>Puntuación: {contador}</p>
        </>
      ) : null}

      {tiempoRestante > 0 && <p>Tiempo restante: {tiempoRestante}</p>}
    </div>
  );
}

export default App;
