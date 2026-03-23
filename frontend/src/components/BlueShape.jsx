import React from "react";

const BlueShape = () => {
  return (
    <>
      <style>{`
        @keyframes blueRect1 {
          0%, 100% { transform: rotate(40deg) translateY(0px) scale(1); }
          50%       { transform: rotate(43deg) translateY(-12px) scale(1.02); }
        }
        @keyframes blueRect2 {
          0%, 100% { transform: rotate(40deg) translateY(0px) scale(1); }
          50%       { transform: rotate(37deg) translateY(10px) scale(0.98); }
        }
        .blue-rect-1 {
          animation: blueRect1 8s ease-in-out infinite;
        }
        .blue-rect-2 {
          animation: blueRect2 8s ease-in-out infinite;
          animation-delay: 1.2s;
        }
      `}</style>

      <div
        className="absolute z-0 pointer-events-none overflow-visible"
        style={{
          width: "280px",
          height: "780px",
          left: "-10px",
          top: "290px",
        }}
      >
        <div
          className="blue-rect-1"
          style={{
            position: "absolute",
            width: "255px",
            height: "255px",
            backgroundColor: "#dbe8ee",
            borderRadius: "18px",
            top: "10px",
            left: "-120px",
          }}
        />

        <div
          className="blue-rect-2"
          style={{
            position: "absolute",
            width: "255px",
            height: "260px",
            backgroundColor: "#dbe8ee",
            borderRadius: "18px",
            top: "305px",
            left: "-18px",
          }}
        />
      </div>
    </>
  );
};

export default BlueShape;