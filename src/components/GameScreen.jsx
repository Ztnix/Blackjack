import PlayerHand from "./PlayerHand";
import CPUHand from "./CPUHand";
import Scoreboard from "./Scoreboard";
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
    .map((card) => card.value)
    .reduce((prev, curr) => prev + curr, 0);
  let totalCPUHandValue = cpuHand
    .map((card) => card.value)
    .reduce((prev, curr) => prev + curr, 0);
  const didRun = useRef(false);

  useEffect(() => {
    if (!didRun.current) {
      dealInitialCards();
      didRun.current = true;
    }
  });

  useEffect(() => {
    //Player Busts
    if (totalPlayerHandValue > 21) {
      setGameState("¡You Lost!");
    }
    //Showdown
    if (gameState === "Showdown" && totalCPUHandValue >= 17) {
      if (totalCPUHandValue > 21) {
        setGameState("¡You Won");
      } else if (totalPlayerHandValue < totalCPUHandValue) {
        setGameState("¡You Lost!");
      } else if (totalPlayerHandValue > totalCPUHandValue) {
        setGameState("¡You Won");
      }
    } else if (gameState === "Showdown" && totalCPUHandValue < 17) {
      dealCard("CPU");
    }
  }, [gameState, totalPlayerHandValue, totalCPUHandValue]);

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

  function resetGame() {
    setPlayer1Hand([]);
    setCPUHand([]);
    setGameState("In Play");
    setCardDeck(cardDeckData);
    dealInitialCards();
  }

  function dealInitialCards() {
    dealCard("Player1");
    dealCard("Player2");
    dealCard("Player1");
    dealCard("Player2");
  }

  return (
    <div className="gameContainer">
      <CPUHand cpuCards={cpuHand} />
      <Scoreboard
        totalCPUHandValue={totalCPUHandValue}
        totalPlayerHandValue={totalPlayerHandValue}
        gameState={gameState}
        dealCard={dealCard}
        resetGame={resetGame}
        setGameState={setGameState}
      />
      <PlayerHand playerCards={player1Hand} />
    </div>
  );
}
