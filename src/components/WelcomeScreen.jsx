import "../styles/WelcomeScreen.css";

export default function WelcomeScreen({ handleScreenStateChange }) {
  return (
    <div className="welcomeContainer">
      <h2>
        Welcome, you could also flush your money down the toilet, you know?
      </h2>
      <button
        className="welcomeBtn"
        onClick={() => handleScreenStateChange("loadingScreen")}
      >
        Begin
      </button>
    </div>
  );
}
