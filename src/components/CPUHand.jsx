import "../styles/PlayerHand.css";

export default function CPUHand({ cpuCards }) {
  function PrintCard(card) {
    let suitIcon;
    let style;
    switch (card.suit) {
      case "spade":
        suitIcon = "♠️";
        style = { color: "black" };
        break;

      case "club":
        suitIcon = "♣️";
        style = { color: "black" };
        break;
      case "heart":
        suitIcon = "♥️";
        style = { color: "red" };
        break;

      case "diamond":
        suitIcon = "♦️";
        style = { color: "red" };
        break;
    }

    return (
      <div className="card" style={style}>
        <div className="upperCornerCard">
          <div className="cornerNumber">
            {card.value != "11" ? card.value : "A"}
          </div>
          <div className="cornerIcon">{suitIcon}</div>
        </div>
        <div className="mainCard">{card.name}</div>
        <div className="lowerCornerCard">
          <div className="cornerNumber">
            {card.value != "11" ? card.value : "A"}
          </div>
          <div className="cornerIcon">{suitIcon}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="cpuHandContainer">
      {cpuCards.map((card) => PrintCard(card))}
    </div>
  );
}
