import React, { useState } from "react";

const InfoButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      {/* Info Button */}
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: "#2980b9",
          color: "#fff",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
      >
        i
      </button>

      {/* Tooltip/Guide Box */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: "0",
            backgroundColor: "#34495e",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
            width: "200px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 100,
          }}
        >
          <p style={{ margin: 0, fontSize: "14px" }}>
            - Watch the sequence.
            <br />
            - Click the buttons in the same order.
            <br />
            - The sequence gets longer each time.
            <br />- Try to reach the highest level! - v1.0.0
            <br />
          </p>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
