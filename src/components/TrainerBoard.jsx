import React, { useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const TrainerBoard = ({ boardSize = 480 }) => {
  const chessRef = useRef(new Chess());
  const [fen, setFen] = useState(chessRef.current.fen());

  const onDrop = (sourceSquare, targetSquare) => {
    const move = chessRef.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    if (move) setFen(chessRef.current.fen());
    return move;
  };

  const undoMove = () => {
    chessRef.current.undo();
    setFen(chessRef.current.fen());
  };

  const resetGame = () => {
    chessRef.current.reset();
    setFen(chessRef.current.fen());
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        boardWidth={boardSize}
        animationDuration={200}
        customDarkSquareStyle={{ backgroundColor: "#1f2937" }} // gray-800
        customLightSquareStyle={{ backgroundColor: "#f3f4f6" }} // gray-100
        customBoardStyle={{
          borderRadius: "0.75rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        }}
      />
      <div className="flex gap-4">
        <button
          onClick={undoMove}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Undo
        </button>
        <button
          onClick={resetGame}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TrainerBoard;
