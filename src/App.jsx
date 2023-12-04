import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./WinningCombination";
import GameOver from "./components/GameOver";

function deriveactivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  let activePlayer = "";
  let gameBoard = initialGameBoard;

  gameTurns.map((turn) => {
    let { square, player } = turn;
    gameBoard[square.row][square.col] = player;
  });

  function handleSeletSquare(rowIndex, colIndex) {
    // setActivePlayer((prevstate) => (prevstate === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      const activePlayer = deriveactivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });

    for (let comb of WINNING_COMBINATIONS) {
      const firstsqsymbol = gameBoard[comb[0].row][comb[0].column];
      const secsqsymbol = gameBoard[comb[1].row][comb[1].column];
      const thirdsqsymbol = gameBoard[comb[2].row][comb[2].column];

      setIsWinner( firstsqsymbol!=null && secsqsymbol!=null && thirdsqsymbol!=null &&
        firstsqsymbol === secsqsymbol && firstsqsymbol === thirdsqsymbol
      );
    }
  }
  console.log(gameTurns);
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={"Player-1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
          />
          <Player
            name={"Player-2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
          />
        </ol>
        {isWinner && <GameOver winner={activePlayer}/>}
        <GameBoard
          handleSeletSquare={handleSeletSquare}
          gameBoard={gameBoard}
        />
      </div>
      <Log gameTurns={gameTurns} />
      
    </main>
  );
}

export default App;
