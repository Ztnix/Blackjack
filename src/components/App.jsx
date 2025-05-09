import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import LoadingScreen from "./LoadingScreen";
import GameScreen from "./GameScreen";
import "../styles/App.css";

export default function App() {
  const [screenState, setScreenState] = useState("welcomeScreen");

  function handleScreenStateChange(value) {
    setScreenState(() => value);
  }

  return (
    <div className="mainContainer">
      {screenState === "welcomeScreen" ? (
        <WelcomeScreen handleScreenStateChange={handleScreenStateChange} />
      ) : screenState === "loadingScreen" ? (
        <LoadingScreen handleScreenStateChange={handleScreenStateChange} />
      ) : (
        <GameScreen />
      )}
    </div>
  );
}
