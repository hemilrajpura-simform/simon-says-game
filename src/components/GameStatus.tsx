import React from "react";

type GameStatusProps = {
  status: string;
  onStart: () => void;
};

const GameStatus: React.FC<GameStatusProps> = ({ status, onStart }) => {
  return (
    <div style={{ paddingTop: 15 }}>
      <h2>{status}</h2>
      <button
        style={{
          background: "linear-gradient(45deg, #e74c3c, #f39c12)",
          color: "#fff",
          padding: "13px 25px",
          fontSize: "18px",
          borderRadius: "30px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          marginTop: "20px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.3)";
        }}
        onClick={onStart}
      >
        Start Game
      </button>
    </div>
  );
};

export default GameStatus;
