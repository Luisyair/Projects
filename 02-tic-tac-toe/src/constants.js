// / los turnos
export const TURNS = {
  X: 'X',
  O: 'O'
};



// // DIBUJAR EL TABLERO  , 9 posiciones y esta vacio
// const board = Array(9).fill(null);


// Esta es una de las opciones para saber si gano, esta es mas larga
export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];