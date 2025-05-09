import PlayerHand from "./PlayerHand";
import CPUHand from "./CPUHand";
import { useState } from "react";
import cardDeckData from "./CardData";

export default function GameScreen() {
  const [cardDeck, setCardDeck] = useState(cardDeckData);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [cpuHand, setCPUHand] = useState([]);
  let randomCard;

  function getRandomCard() {
    randomCard = Math.floor(Math.random() * cardDeck.length);
    if (cardDeck[randomCard].dealt === true) {
      console.log(
        "Card has already been dealt:",
        cardDeck[randomCard],
        "Main array index of:",
        randomCard,
        "Rerolling..."
      );
      getRandomCard();
    } else {
      console.log(
        "Card dealt:",
        cardDeck[randomCard],
        "Main array index of:",
        randomCard
      );
      return;
    }
  }

  function dealCard(player) {
    getRandomCard();
    setCardDeck((prevDeck) => {
      const newDeck = [...prevDeck];

      newDeck[randomCard] = {
        ...newDeck[randomCard],
        dealt: true,
      };
      player === "Player1"
        ? setPlayer1Hand([...player1Hand, newDeck[randomCard]])
        : setCPUHand([...cpuHand, newDeck[randomCard]]);
      return newDeck;
    });
  }

  return (
    <div className="gameContainer">
      <CPUHand cpuCards={cpuHand} dealCard={dealCard} />
      <PlayerHand playerCards={player1Hand} dealCard={dealCard} />
    </div>
  );
}
