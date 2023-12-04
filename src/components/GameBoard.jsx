

function GameBoard({ handleSeletSquare, gameBoard }) {


  return (
    <ol id="game-board">
      {gameBoard.map((row, rowindex) => {
        return (
          <li key={rowindex}>
            <ol>
              {row.map((column, colindex) => {
                return (
                  <li key={colindex}>
                    <button
                      onClick={() => handleSeletSquare(rowindex, colindex)}
                      disabled={gameBoard[rowindex][colindex] ? true : false}
                    >
                      {column}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}

export default GameBoard;
