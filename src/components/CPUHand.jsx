import "../styles/PlayerHand.css";

export default function CPUHand({ cpuCards, dealCard }) {
  return (
    <div className="cpuHandContainer">
      {cpuCards.map((obj) => (
        <div className="card">{obj.number}</div>
      ))}
      <button className="dealCardBtn" onClick={() => dealCard("CPU")}>
        Deal Card
      </button>
    </div>
  );
}
