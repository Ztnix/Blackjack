import "../styles/Scoreboard.css";

export default function Scoreboard({
  totalCPUHandValue,
  totalPlayerHandValue,
  gameState,
  dealCard,
  resetGame,
  setGameState,
}) {
  return (
    <div className="scoreboard">
      <div className="playerScore">
        <p>Your Score:</p>
        {totalPlayerHandValue}
      </div>
      <button
        disabled={gameState != "In Play"}
        className="dealCardBtn"
        onClick={() => dealCard("Player1")}
      >
        Deal
      </button>
      <div className="gameState">
        {gameState}
        <button
          hidden={gameState === "In Play" || gameState === "Showdown"}
          className="retryBtn"
          onClick={() => resetGame()}
        >
          Go Again
        </button>
      </div>
      <button
        disabled={gameState != "In Play"}
        className="standBtn"
        onClick={() => setGameState("Showdown")}
      >
        Stand
      </button>
      <div className="CPUScore">
        <p>CPU Score:</p>
        {totalCPUHandValue}
      </div>
    </div>
  );
}
