function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((turn, index) => {
        let { square, player } = turn;
        return (
          <li key={index}>
            {player} selected {square.row},{square.col}
          </li>
        );
      })}
    </ol>
  );
}

export default Log;
