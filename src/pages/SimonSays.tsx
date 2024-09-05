import React, { useState, useEffect } from "react";
import SimonButton from "../components/SimonButton";
import GameStatus from "../components/GameStatus";
import InfoButton from "../components/InfoButton";

const colors = ["#e74c3c", "#27ae60", "#2980b9", "#f1c40f"];

const SimonSays: React.FC = () => {
  const [gameSequence, setGameSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Click start to play");
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [highestScore, setHighestScore] = useState<number>(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("simonHighestScore");
    if (storedHighScore) {
      setHighestScore(Number(storedHighScore));
    }
  }, []);

  const playWinSound = () => {
    const audio = new Audio("/sounds/winSound.wav");
    audio.play();
  };

  const playWrongSound = () => {
    const audio = new Audio("/sounds/wrongSound.wav");
    audio.play();
  };

  const startGame = () => {
    setStatus("Watch the sequence");
    setGameSequence([]);
    setPlayerSequence([]);
    setCurrentLevel(0);
    nextLevel();
  };

  const nextLevel = () => {
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...gameSequence, nextColor];
    setGameSequence(newSequence);
    setPlayerSequence([]);
    setCurrentLevel((prevLevel) => prevLevel + 1);
    playSequence(newSequence);
  };

  const playSequence = (sequence: string[]) => {
    sequence.forEach((color, index) => {
      setTimeout(() => {
        setActiveButton(color);
        setTimeout(() => {
          setActiveButton(null);
          if (index === sequence.length - 1) {
            setStatus("Your turn");
            setIsPlayerTurn(true);
          }
        }, 500);
      }, 1000 * index);
    });
  };

  const handleButtonClick = (color: string) => {
    if (!isPlayerTurn) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (gameSequence[newPlayerSequence.length - 1] !== color) {
      playWrongSound();
      setStatus("Game Over! Try again");
      setIsPlayerTurn(false);
      updateHighScore(currentLevel);
      return;
    }

    if (newPlayerSequence.length === gameSequence.length) {
      setIsPlayerTurn(false);
      if (currentLevel) playWinSound();
      setStatus("Correct! Next level.");
      setTimeout(nextLevel, 1000);
    }
  };

  const updateHighScore = (level: number) => {
    if (level > highestScore) {
      setHighestScore(level);
      localStorage.setItem("simonHighestScore", String(level));
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#2c3e50",
        height: "100vh",
        color: "#ecf0f1",
        position: "relative",
      }}
    >
      <GameStatus status={status} onStart={startGame} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 150px)",
          gridGap: "20px",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {colors.map((color, index) => (
          <SimonButton
            key={color}
            color={color}
            isActive={activeButton === color}
            onClick={() => handleButtonClick(color)}
            isPlayerTurn={isPlayerTurn}
          />
        ))}
      </div>
      <h3>Level: {currentLevel}</h3>
      <h3>Highest Score: {highestScore}</h3>
      <InfoButton />
    </div>
  );
};

export default SimonSays;
