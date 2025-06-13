
// children = lo que tiene el tablero
export const Square = ({ children, isSelected, updateBoard, index }) => {
  // constante para saber que tunro toca
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  // const hola = () =>{
  //   updateBoard()
  // }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};