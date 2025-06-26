import React, { useState } from 'react';
import { RotateCcw, Lightbulb } from 'lucide-react';
import { ChessPiece } from './ChessPieces';

export const InteractiveBoard = () => {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [showHint, setShowHint] = useState(true);

  // Initial chess board setup
  const initialBoard = () => {
    const board = [];
    
    // Create 8x8 board
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isLight = (row + col) % 2 === 0;
        let piece = null;
        
        // Set up initial pieces
        if (row === 0) {
          const pieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
          piece = pieces[col];
        } else if (row === 1) {
          piece = '♟';
        } else if (row === 6) {
          piece = '♙';
        } else if (row === 7) {
          const pieces = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
          piece = pieces[col];
        }
        
        board.push({
          piece,
          color: isLight ? 'light' : 'dark'
        });
      }
    }
    
    return board;
  };

  const [board, setBoard] = useState(initialBoard());

  const handleSquareClick = (index) => {
    setShowHint(false);
    if (selectedSquare === index) {
      setSelectedSquare(null);
    } else if (selectedSquare !== null && board[selectedSquare].piece) {
      // Move piece
      const newBoard = [...board];
      newBoard[index].piece = newBoard[selectedSquare].piece;
      newBoard[selectedSquare].piece = null;
      setBoard(newBoard);
      setSelectedSquare(null);
    } else if (board[index].piece) {
      setSelectedSquare(index);
    }
  };

  const resetBoard = () => {
    setBoard(initialBoard());
    setSelectedSquare(null);
    setShowHint(true);
  };

  const isWhitePiece = (piece) => {
    return ['♔', '♕', '♖', '♗', '♘', '♙'].includes(piece);
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Instructions first, Desktop: Side by side */}
        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center">
          
          {/* Left Column (Desktop) / Bottom (Mobile) - Interactive Chessboard */}
          <div className="flex flex-col items-center md:items-start flex-1">
            <div className="bg-slate-700 p-4 rounded-2xl shadow-2xl">
              <div className="grid grid-cols-8 gap-0 rounded-xl overflow-hidden shadow-inner border border-slate-600">
                {board.map((square, index) => (
                  <div
                    key={index}
                    className={`
                      w-12 h-12 md:w-16 md:h-16 flex items-center justify-center cursor-pointer
                      transition-all duration-200 relative group
                      ${square.color === 'light' 
                        ? 'bg-slate-300 hover:bg-slate-200' 
                        : 'bg-slate-700 hover:bg-slate-600'
                      }
                    `}
                    style={{
                      backgroundColor: square.color === 'light' ? '#cbd5e1' : '#334155',
                      boxShadow: selectedSquare === index ? 'inset 0 0 0 3px #3b82f6' : 'none'
                    }}
                    onClick={() => handleSquareClick(index)}
                  >
                    {square.piece && (
                      <div className="group-hover:scale-110 transition-transform duration-200">
                        <ChessPiece 
                          piece={square.piece} 
                          isWhite={isWhitePiece(square.piece)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={resetBoard}
              className="mt-6 flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-blue-400 transition-colors hover:bg-gray-700/50 rounded-lg"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Board
            </button>
          </div>

          {/* Right Column (Desktop) / Top (Mobile) - Instructions and Hints */}
          <div className="space-y-6 flex-1">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Try It Out Right Now
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Click on any piece to select it, then click a square to move. You'll see feedback on whether it's part of a known opening.
              </p>
            </div>

            {/* Hint Box */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-blue-400 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">
                    💡 Next move: e4 — the King's Pawn Opening
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    This is one of the most popular first moves in chess. It controls the center and opens lines for your pieces. Try clicking on the white pawn in front of the king!
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Interactive Hint */}
            {showHint && (
              <div className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm">
                    Ready to make your first move? Click any piece to get started!
                  </span>
                </div>
              </div>
            )}

            {/* Progress Indicator */}
            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Opening Progress</span>
                <span className="text-sm text-blue-400">0/3 moves</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-0 transition-all duration-300"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Make moves to see your opening progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};