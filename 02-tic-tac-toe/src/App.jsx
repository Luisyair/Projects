// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { Children } from "react";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";

import { Square } from "./components/Square"; //squeare

import { TURNS, WINNER_COMBOS } from "./constants"; //Turns

import { WinnerModal } from "./components/WinnerModal"; //squeare



function App() {
  // crear un estado useStates( estado inicial del tablero)
  // arreglo [el tablero, una forma de actualizarlo]
  // const [board, setBoard] = useState(Array(9).fill(null));  ANTES

  // creacion de funcion para cada vez que se reinice el juego
  const [board, setBoard] = useState(() => {
    // si hay una paartidad guardada
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  // estado para saber de quien es el turno x o O
  // DEVUELVE UN ARREGLO [VALOR ESTADO , COMO ACTUALIZARLO ]
  // const [turn, setTurn] = useState(TURNS.X); solo esto antes

  // creacion de funcion para cada vez que se reinice el juego
  const [turn, setTurn] = useState(() => {
    // si hay una paartidad guardada
    const turnFromStorage = window.localStorage.getItem("turn");
    if (turnFromStorage) return turnFromStorage;
    return TURNS.X;
  });

  // COMO SABER SI YA GANO
  const [winner, setWinner] = useState(null);

  // crear un metodo que resive el board - chequea la winer
  const checWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && //primero verifica si hay algo una x u o
        boardToCheck[a] === boardToCheck[b] && // comparamos si las dos son iguales
        boardToCheck[a] === boardToCheck[c]
      ) {
        // comparamos si las dos son iguales
        return boardToCheck[a];
      }
    }
    // si no hay ganador
    return;
  };

  // funcion para reset Game

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    // tamnbie se reseta lo del local storage y turn
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  // revisar si el juego termino cuando hay un empate
  // si todas lasposciones (Square) son diferentes de null
  const checkEndGame = (newBoard) => {
    return newBoard.every((Square) => Square !== null);
  };

  // creacion de la funcion updateboard  para actualizar estados, cambiar estado, ver si gano
  const updateBoard = (index) => {
    // No actualizamos la poscion si ya tiene algo para no sobrescribir
    // que solamente pueda seleccionarse llos cuadros 1 vez
    if (board[index] || winner) return;

    // creamos un nuevo boarD para poder que en cada cuadro al hacer click se añada
    // la X u O respectiva al turno por eso seiguala altruno porque este ya tiene
    // la infromacion de que tunro va.

    // los ...board significa: "Crea un nuevo arreglo newBoard que contenga todos
    // los elementos de board, pero en una nueva referencia (no el mismo espacio en memoria).
    // nunca modificar los arrays osino que cree otro array como copia de forma superficial con ...name
    // INMUTABLES SIEMPRE
    const newBoard = [...board];
    newBoard[index] = turn; // x u o
    setBoard(newBoard);

    // si el turno = al de x significa que el nuevo turno sera el de 0 y viceverda
    // no se puede utilizar true or false
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    // para actualizar el estado se llama al setTurn, cada vez que se hace onClick
    // en un cuadrado se cambiara el turno
    setTurn(newTurn);

    // Guardar partida con localStorage,el tablero y el turno

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    // Revisaremos si hay un ganador
    const newWinner = checWinner(newBoard);

    //  una idea con alertas pero no es asincrona
    //  if (newWinner)
    //    setWinner((prevWinner) => {
    //    console.log(`Ganador: ${newWinner}, el anterior era ${prevWinner}`);
    //    alert(`Ganador: ${newWinner}, el anterior era ${prevWinner}`);
    //    return newWinner;
    //   });


    // Añadir musica cuando ganan
    const winSound = new Audio("/Music/winners.mp3");
    winSound.volume = 0.8;
    

    if (newWinner) {
      // añadir confeti de canva
      confetti();
      winSound.play();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
    }
  };

  // se efecuta solo en el cuerpo de la app, creacion de la funcion, un nuevo hug que nos da REAC se llama useEffect
  // como minimo se ejecuta una vez
  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <main className="board">
      <h1> tic tac toe</h1>
      <button onClick={resetGame}>Resetear el juego</button>

      <section className="game">
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              // llamar la funcion upddateboard para ejecutarlo,  para actualizar estados, cambiar estado, ver si gano
              // no se pasa la ejecucion de la funcion porque se renderiza cada vez que se actualiza
              // lo que queremos ejecutar solo cuando le damos click no cuando se renderiza
              // por eso no hacemos esto: updateboard ={ updateboard()} No la ejecucion
              updateBoard={updateBoard}
            >
              {/* aqui le pone los numeros {index} a cada renderizado a cada cuadro 
        pero se lo quitaremos porque vamos a necesitar pones las x o las O
         */}
              {/* {index} */}

              {/* Necesitaremos un estado para guardar cuando el usuario le da click
         al cuadro */}

              {square}
            </Square>
          );
        })}
      </section>

      {/* mostrar visualmente quien tiene el tunro la X o O  */}
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      {/* apartado para visualizar el modal de end game  */}
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
