// TrainerPage.jsx — Responsive Chessboard + Eval Bar + Line Selector Below Chatbox + Opening Title
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import courses from '../data/courses.json';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Crown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TrainerPage() {
  const { id } = useParams();
  const course = courses.find(c => c.id === id);

  const [selectedLineIndex, setSelectedLineIndex] = useState(0);
  const selectedLine = course?.lines?.[selectedLineIndex] || { moves: [] };

  const [game, setGame] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [orientation, setOrientation] = useState('white');
  const [boardWidth, setBoardWidth] = useState(480);

  const engine = useRef(null);
  const [evalScore, setEvalScore] = useState(null);
  const [mateIn, setMateIn] = useState(null);

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const getUserBarPercent = (cp) => {
    const adjusted = orientation === 'black' ? -cp : cp;
    return clamp(50 + adjusted / 20, 0, 100);
  };
  const getScorePositionClass = () => {
    if (evalScore === 0 || mateIn === 0) return orientation === 'white' ? 'bottom-0' : 'top-0';
    if (evalScore > 0 || mateIn > 0) return orientation === 'white' ? 'bottom-0' : 'top-0';
    return orientation === 'black' ? 'bottom-0' : 'top-0';
  };

  useEffect(() => {
    engine.current = new Worker('/MoveMaven/stockfish/stockfish.js');
    engine.current.onmessage = (e) => {
      let line = e.data;
      if (typeof line !== 'string' && typeof line?.data === 'string') line = line.data;
      if (typeof line !== 'string') return;
      if (line.startsWith('info') && line.includes('score mate')) {
        const m = line.match(/score mate (-?\d+)/);
        if (m) {
          setMateIn(parseInt(m[1], 10));
          setEvalScore(null);
        }
      } else if (line.startsWith('info') && line.includes('score cp')) {
        const m = line.match(/score cp (-?\d+)/);
        if (m) {
          setEvalScore(parseInt(m[1], 10));
          setMateIn(null);
        }
      }
    };
    engine.current.postMessage('uci');
    return () => engine.current?.terminate();
  }, []);

  useEffect(() => {
    const fresh = new Chess();
    setGame(fresh);
    setMoveIndex(0);
    setStatus('');
    setHistory([]);
    setRedoStack([]);
    setOrientation(course?.side?.toLowerCase() === 'black' ? 'black' : 'white');
    playNextIfOpponent(fresh, 0);
  }, [id, selectedLineIndex]);

  const boardContainerRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      if (!boardContainerRef.current) return;
      const w = boardContainerRef.current.offsetWidth;
      setBoardWidth(Math.max(320, Math.min(600, Math.floor(w * 0.9))));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const evalTimeout = useRef(null);
  useEffect(() => {
    if (!engine.current) return;
    clearTimeout(evalTimeout.current);
    evalTimeout.current = setTimeout(() => {
      const fen = game.fen();
      engine.current.postMessage('position fen ' + fen);
      engine.current.postMessage('go depth 15');
    }, 200);
  }, [game]);

  const playNextIfOpponent = (tempGame, newIdx) => {
    const nextMove = selectedLine?.moves?.[newIdx];
    if (!nextMove) return;

    const moveColor = tempGame.turn();
    const moveSide = course.side.toLowerCase();
    const isOppTurn =
      (moveSide === 'white' && moveColor === 'b') ||
      (moveSide === 'black' && moveColor === 'w');

    if (isOppTurn) {
      setTimeout(() => {
        const auto = new Chess(tempGame.fen());
        auto.move(nextMove.san);
        setGame(auto);
        setMoveIndex(newIdx + 1);
        setHistory(prev => [...prev, tempGame.fen(), auto.fen()]);
      }, 500);
    }
  };

  const handlePieceDrop = (from, to) => {
    const temp = new Chess(game.fen());
    let res;
    try {
      res = temp.move({ from, to, promotion: 'q' });
    } catch (e) {
      setStatus('❌ Invalid move.');
      return false;
    }
    if (!res) { setStatus('❌ Invalid move.'); return false; }

    if (res.san === selectedLine.moves[moveIndex]?.san) {
      setGame(temp);
      const newIdx = moveIndex + 1;
      setMoveIndex(newIdx);
      setHistory([...history, game.fen()]);
      setRedoStack([]);
      setStatus('✅ Correct move!');
      playNextIfOpponent(temp, newIdx);
      return true;
    } else {
      setStatus('❌ Incorrect move. Try again.');
      return false;
    }
  };

  const undoMove = () => {
    if (moveIndex === 0) return;
    const newHist = [...history];
    const lastFen = newHist.pop();
    setRedoStack([game.fen(), ...redoStack]);
    setGame(new Chess(lastFen));
    setMoveIndex(p => p - 1);
    setHistory(newHist);
    setStatus('🔁 Move undone.');
  };
  const redoMove = () => {
    if (!redoStack.length) return;
    const [nextFen, ...rest] = redoStack;
    setGame(new Chess(nextFen));
    setMoveIndex(p => p + 1);
    setHistory([...history, game.fen()]);
    setRedoStack(rest);
    setStatus('🔁 Move redone.');
  };
  const resetCourse = () => {
    setGame(new Chess());
    setMoveIndex(0);
    setStatus('🔁 Course reset.');
    setHistory([]);
    setRedoStack([]);
  };

  const progressPercent = ((moveIndex / selectedLine.moves.length) * 100).toFixed(0);
  if (!course) return <div className="text-white text-center py-20">Course not found</div>;

  return (
    <div className="min-h-screen bg-[#000814] text-white">
      <Header />

      {/* Progress bar */}
      <div className="h-2 bg-gray-700">
        <div className="h-full bg-[#3bc0f2]" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Opening title
      <div className="text-center my-4">
        <h1 className="text-3xl font-bold text-[#3bc0f2]">{course.title}</h1>
      </div> */}

      <div className="flex flex-col gap-8 px-4 lg:px-16 py-10">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">

          {/* BoardContainer */}
          <div className="flex gap-6 justify-center" ref={boardContainerRef}
               style={{ minWidth: 350, flex: '1 1 0%' }}>

            {/* ─────────── Evaluation Bar ─────────── */}
            <div className="w-5 rounded overflow-hidden bg-black relative text-xs text-white"
              style={{ height: `${boardWidth}px`, minHeight: 320, maxHeight: 600 }}>

              <div className={`absolute ${orientation === 'white' ? 'bottom-0' : 'top-0'} left-0 right-0 bg-white transition-all duration-300`}
                   style={{ height: `${getUserBarPercent(evalScore ?? (mateIn > 0 ? 1000 : -1000))}%` }} />

              <div
                className={`absolute ${getScorePositionClass()} left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.5rem] font-bold`}
                style={{ color: evalScore > 0 ? '#000' : '#fff' }}>
                {mateIn !== null
                  ? `#${Math.abs(mateIn)}`
                  : evalScore !== null
                  ? evalScore > 0
                    ? `+${(evalScore / 100).toFixed(1)}`
                    : (evalScore / 100).toFixed(1)
                  : '...'}
              </div>
            </div>

            {/* ───────────── Chessboard ───────────── */}
            <div className="flex flex-col items-center">
              <Chessboard
                position={game.fen()}
                onPieceDrop={handlePieceDrop}
                boardWidth={boardWidth}
                boardOrientation={orientation}
                customBoardStyle={{ borderRadius: '0.25rem', boxShadow: '0 0 10px rgba(255,255,255,0.1)' }}
              />
              <div className="flex gap-4 mt-4">
                <button onClick={undoMove}
                        className="bg-[#003566] px-4 py-2 rounded hover:bg-[#2d6cee]">Undo</button>
                <button onClick={redoMove}
                        className="bg-[#003566] px-4 py-2 rounded hover:bg-[#2d6cee]">Redo</button>
                <button onClick={resetCourse}
                        className="bg-[#ffc300] px-4 py-2 rounded text-black hover:bg-[#ffd60a]">Reset</button>
              </div>
            </div>
          </div>

          {/* Chatbox with Line Selector Below */}
          <div className="w-full max-w-[400px] bg-[#111926] rounded-xl p-4 border border-[#2d6cee] shadow-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white mb-1 rounded-md text-center bg-gray-700 ">
              {course?.title}
            </h2>
            <h2 className="text-[#3bc0f2] text-xl flex items-center gap-2 font-bold">
              <Crown className="w-6 h-6 text-blue-400" /> Sensei says:
            </h2>
            <div className="space-y-3">
              <div className="bg-[#003566] p-3 rounded-xl w-fit max-w-full">
                <p>{selectedLine.moves[moveIndex]?.comment || '🏁 You have completed this line!'}</p>
              </div>
              {status && <div className="text-sm text-[#ffc300]">{status}</div>}
            </div>

            {/* Line Selector */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                onClick={() => setSelectedLineIndex((prev) => (prev - 1 + course.lines.length) % course.lines.length)}
                className="bg-[#003566] hover:bg-[#2d6cee] px-2 py-1 rounded"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-lg font-semibold">{selectedLine.name}</span>
              <button
                onClick={() => setSelectedLineIndex((prev) => (prev + 1) % course.lines.length)}
                className="bg-[#003566] hover:bg-[#2d6cee] px-2 py-1 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
