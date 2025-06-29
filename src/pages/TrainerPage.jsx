// TrainerPage.jsx — Responsive + Large Chessboard + Medium Chatbox with Smooth Autoplay

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import courses from '../data/courses.json';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Crown } from 'lucide-react';

export default function TrainerPage() {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  const [game, setGame] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [orientation, setOrientation] = useState('white');
  const boardContainerRef = useRef(null);
  const [boardWidth, setBoardWidth] = useState(480);

  useEffect(() => {
    const newGame = new Chess();
    setGame(newGame);
    setMoveIndex(0);
    setStatus("");
    setHistory([]);
    setRedoStack([]);
    setOrientation(course?.side?.toLowerCase() === 'black' ? 'black' : 'white');
  }, [id]);

  useEffect(() => {
    function handleResize() {
      if (boardContainerRef.current) {
        // Responsive: 90% of container, min 320, max 600
        const containerWidth = boardContainerRef.current.offsetWidth;
        setBoardWidth(Math.max(320, Math.min(600, Math.floor(containerWidth * 0.9))));
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const playNextIfOpponent = (tempGame, newIndex) => {
    const nextNextMove = course?.moves?.[newIndex];
    if (!nextNextMove) return;

    const moveColor = tempGame.turn();
    const moveSide = course.side.toLowerCase();
    const isOpponentTurn = (moveSide === 'white' && moveColor === 'b') || (moveSide === 'black' && moveColor === 'w');

    if (isOpponentTurn && nextNextMove) {
      setTimeout(() => {
        const autoGame = new Chess(tempGame.fen());
        autoGame.move(nextNextMove.san);
        setGame(autoGame);
        setMoveIndex(newIndex + 1);
        setHistory(prev => [...prev, tempGame.fen(), autoGame.fen()]);
      }, 500);
    }
  };

  const handlePieceDrop = (sourceSquare, targetSquare) => {
    const moveAttempt = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    };
    const tempGame = new Chess(game.fen());
    const result = tempGame.move(moveAttempt);

    if (!result) {
      setStatus("❌ Invalid move.");
      return false;
    }
    if (result.san === course.moves[moveIndex]?.san) {
      setGame(tempGame);
      const newIndex = moveIndex + 1;
      setMoveIndex(newIndex);
      setHistory([...history, game.fen()]);
      setRedoStack([]);
      setStatus("✅ Correct move!");
      playNextIfOpponent(tempGame, newIndex);
      return true;
    } else {
      setStatus("❌ Incorrect move. Try again.");
      return false;
    }
  };

  const undoMove = () => {
    if (moveIndex === 0) return;
    const newHistory = [...history];
    const lastFEN = newHistory.pop();
    setRedoStack([game.fen(), ...redoStack]);
    setGame(new Chess(lastFEN));
    setMoveIndex(prev => prev - 1);
    setHistory(newHistory);
    setStatus("🔁 Move undone.");
  };

  const redoMove = () => {
    if (redoStack.length === 0) return;
    const [nextFEN, ...restRedo] = redoStack;
    setGame(new Chess(nextFEN));
    setMoveIndex(prev => prev + 1);
    setHistory([...history, game.fen()]);
    setRedoStack(restRedo);
    setStatus("🔁 Move redone.");
  };

  const resetCourse = () => {
    setGame(new Chess());
    setMoveIndex(0);
    setStatus("🔁 Course reset.");
    setHistory([]);
    setRedoStack([]);
  };

  const progressPercent = ((moveIndex / course.moves.length) * 100).toFixed(0);

  if (!course) return <div className="text-white text-center py-20">Course not found</div>;

  return (
    <div className="min-h-screen bg-[#000814] text-white">
      <Header /> 
      {/* Progress Bar */}
      <div className="h-2 bg-gray-700">
        <div className="h-full bg-[#3bc0f2] transition-all" style={{ width: `${progressPercent}%` }}></div>
      </div>


      <div className="flex flex-col gap-8 px-4 lg:px-16 py-10 ">
        {/* Board+Eval + ChatBox */}
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
          {/* Evaluation Bar + ChessBoard */}
          <div className="flex flex-row items-start gap-6 justify-center" ref={boardContainerRef} style={{ minWidth: 350, flex: '1 1 0%' }}>
            {/* Evaluation Bar */}
            <div
              className="w-4 rounded-full bg-white relative"
              style={{ height: `${boardWidth}px`, minHeight: 320, maxHeight: 600 }}
            >
              <div
                className="absolute left-0 right-0 h-[2px] bg-black"
                style={{ top: '30%' }}
              />
            </div>
            {/* Chessboard */}
            <div className="flex flex-col items-center justify-center">
              <Chessboard
                position={game.fen()}
                onPieceDrop={handlePieceDrop}
                boardWidth={boardWidth}
                boardOrientation={orientation}
                customBoardStyle={{ borderRadius: '1rem', boxShadow: '0 0 10px rgba(255,255,255,0.1)' }}
              />
              <div className="flex gap-4 mt-4">
                <button onClick={undoMove} className="bg-[#003566] px-4 py-2 rounded text-white hover:bg-[#2d6cee]">Undo</button>
                <button onClick={redoMove} className="bg-[#003566] px-4 py-2 rounded text-white hover:bg-[#2d6cee]">Redo</button>
                <button onClick={resetCourse} className="bg-[#ffc300] px-4 py-2 rounded text-black hover:bg-[#ffd60a]">Reset</button>
              </div>
            </div>
          </div>

          {/* Chatbox */}
          <div className="w-full max-w-[400px] bg-[#111926] rounded-xl p-4 border border-[#2d6cee] shadow-xl">
            <h2 className="text-[#3bc0f2] text-xl flex flex-row gap-2 items-center font-bold mb-4">
              <Crown className="text-blue-400 w-6 h-6" />
              Sensei says:
            </h2>
            <div className="space-y-3">
              <div className="bg-[#003566] text-white p-3 rounded-xl w-fit max-w-full">
                <p>{course.moves[moveIndex]?.comment || "🏁 You have completed this course!"}</p>
              </div>
              {status && (
                <div className="text-sm text-[#ffc300]">{status}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
