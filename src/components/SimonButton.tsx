import React from "react";

type SimonButtonProps = {
  color: string;
  onClick: () => void;
  isActive: boolean;
  isPlayerTurn: boolean;
};

const SimonButton: React.FC<SimonButtonProps> = ({
  color,
  onClick,
  isActive,
  isPlayerTurn,
}) => {
  const playClickSound = () => {
    const audio = new Audio("/sounds/clickSound.wav");
    audio.play();
  };

  const handleClick = () => {
    if (isPlayerTurn) {
      playClickSound();
      onClick();
    }
  };
  const highlightColor = (color: string) => {
    switch (color) {
      case "#e74c3c":
        return "rgba(231, 76, 60, 0.7)";
      case "#27ae60":
        return "rgba(39, 174, 96, 0.7)";
      case "#2980b9":
        return "rgba(41, 128, 185, 0.7)";
      case "#f1c40f":
        return "rgba(241, 196, 15, 0.7)";
      default:
        return color;
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: isActive ? highlightColor(color) : color,
        width: "130px",
        height: "130px",
        borderRadius: "50%",
        margin: "10px",
        border: "5px solid #ecf0f1",
        boxShadow: isActive ? "0 0 20px #fff" : "0 0 10px rgba(0, 0, 0, 0.5)",
        cursor: "pointer",
        transition: "background-color 0.3s, box-shadow 0.3s ease",
      }}
    />
  );
};

export default SimonButton;
