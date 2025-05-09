import { useEffect } from "react";
import AceSource from "../assets/Ace_of_Spades.png";
import "../styles/LoadingScreen.css";

export default function LoadingScreen({ handleScreenStateChange }) {
  useEffect(() => {
    let countdown = setInterval(() => {
      handleScreenStateChange("gameScreen");
    }, 100);

    return () => clearInterval(countdown);
  }, [handleScreenStateChange]);
  return (
    <div className="loadingContainer">
      <img src={AceSource} alt="" className="loadingImg" />
      <div className="loadingText">Loading...</div>
    </div>
  );
}
