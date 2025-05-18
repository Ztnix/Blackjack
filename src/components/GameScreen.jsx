import PlayerHand from "./PlayerHand";
import CPUHand from "./CPUHand";
import Scoreboard from "./Scoreboard";
import { useState, useEffect, useRef, useMemo } from "react";
import cardDeckData from "./CardData";
import "../styles/GameScreen.css";

export default function GameScreen() {
  const [cardDeck, setCardDeck] = useState(cardDeckData);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [cpuHand, setCPUHand] = useState([]);
  const [gameState, setGameState] = useState("In Play");
  let randomCard;
  const didRun = useRef(false);

  const totalPlayerHandValue = useMemo(
    () => computeHandValue(player1Hand),
    [player1Hand]
  );

  const totalCPUHandValue = useMemo(() => computeHandValue(cpuHand), [cpuHand]);

  function computeHandValue(hand) {
    let total = hand
      .map((card) => card.value)
      .reduce((prev, curr) => prev + curr, 0);

    let aces = hand.filter((card) => card.value === 11).length;

    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }
    return total;
  }

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
        setGameState("¡You Won!");
      } else if (totalPlayerHandValue < totalCPUHandValue) {
        setGameState("¡You Lost!");
      } else if (totalPlayerHandValue > totalCPUHandValue) {
        setGameState("¡You Won!");
      } else if (totalPlayerHandValue === totalCPUHandValue) {
        setGameState("¡It's a Tie!");
      }
    } else if (gameState === "Showdown" && totalCPUHandValue < 17) {
      dealCard("CPU");
    }

    //First turn BlackJack
    if (player1Hand.length === 2 && cpuHand.length === 2) {
      if (totalPlayerHandValue === 21 && totalCPUHandValue === 21) {
        setGameState("¡It's a Tie!");
      } else if (totalPlayerHandValue === 21 && totalCPUHandValue != 21) {
        setGameState("¡You Won!");
      } else if (totalCPUHandValue === 21 && totalPlayerHandValue != 21) {
        setGameState("¡You Lost!");
      }
    }
  }, [
    gameState,
    totalPlayerHandValue,
    totalCPUHandValue,
    player1Hand.length,
    cpuHand.length,
  ]);

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
