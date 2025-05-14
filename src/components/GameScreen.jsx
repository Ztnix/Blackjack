import PlayerHand from "./PlayerHand";
import CPUHand from "./CPUHand";
import { useState, useEffect, useRef } from "react";
import cardDeckData from "./CardData";
import "../styles/GameScreen.css";

export default function GameScreen() {
  const [cardDeck, setCardDeck] = useState(cardDeckData);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [cpuHand, setCPUHand] = useState([]);
  const [gameState, setGameState] = useState("In Play");

  let randomCard;
  let totalPlayerHandValue = player1Hand
    .map((card) => card.number)
    .reduce((prev, curr) => prev + curr, 0);
  let totalCPUHandValue = cpuHand
    .map((card) => card.number)
    .reduce((prev, curr) => prev + curr, 0);
  const didRun = useRef(false);

  useEffect(() => {
    if (!didRun.current) {
      dealCard("Player1");
      dealCard("Player2");
      dealCard("Player1");
      dealCard("Player2");
      didRun.current = true;
    }
  }, []);

  useEffect(() => {
    if (totalPlayerHandValue > 21) {
      setGameState("¡You Lost!");
    } else if (
      totalPlayerHandValue === totalCPUHandValue &&
      player1Hand.length === 2 &&
      cpuHand.length === 2
    ) {
      setGameState("¡Tie!");
    }
  }, [totalPlayerHandValue, totalCPUHandValue]);

  function getRandomCard() {
    randomCard = Math.floor(Math.random() * cardDeck.length);
    if (cardDeck[randomCard].dealt === true) {
      // console.log(
      //   "Card has already been dealt:",
      //   cardDeck[randomCard],
      //   "Main array index of:",
      //   randomCard,
      //   "Rerolling..."
      // );
      getRandomCard();
    } else {
      // console.log(
      //   "Card dealt:",
      //   cardDeck[randomCard],
      //   "Main array index of:",
      //   randomCard
      // );
      return;
    }
  }

  function dealCard(player) {
    getRandomCard();
    const newDeck = [...cardDeck];
    newDeck[randomCard] = {
      ...newDeck[randomCard],
      dealt: true,
    };
    const dealtCard = newDeck[randomCard];
    player === "Player1"
      ? setPlayer1Hand((player1Hand) => [...player1Hand, dealtCard])
      : setCPUHand((cpuHand) => [...cpuHand, dealtCard]);
    setCardDeck(newDeck);
  }

  function playLogic(player) {
    dealCard(player);
  }

  function playCPULogic() {}

  return (
    <div className="gameContainer">
      <CPUHand cpuCards={cpuHand} playLogic={playLogic} />
      <div className="scoreboard">
        <div className="playerScore">
          <p>Your Score:</p>
          {totalPlayerHandValue}
        </div>
        <button className="dealCardBtn" onClick={() => playLogic("Player1")}>
          Deal
        </button>
        <div className="gameState">{gameState}</div>
        <button className="standBtn" onClick={() => playCPULogic()}>
          Stand
        </button>
        <div className="CPUScore">
          <p>CPU Score:</p>
          {totalCPUHandValue}
        </div>
      </div>
      <PlayerHand playerCards={player1Hand} playLogic={playLogic} />
    </div>
  );
}
