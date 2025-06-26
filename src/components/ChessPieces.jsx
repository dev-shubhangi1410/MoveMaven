import React from 'react';

// TypeScript interfaces and types removed for JSX compatibility

export const ChessPiece = ({ piece, isWhite, className = "" }) => {
  const pieceColor = isWhite ? '#f8fafc' : '#0f172a';

  const pieceComponents = {
    // White pieces
    '♔': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M12 2l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3L12 2zm0 6c-2.5 0-4.5 2-4.5 4.5V18h9v-5.5c0-2.5-2-4.5-4.5-4.5zm-6 12h12v2H6v-2z" />
      </svg>
    ),
    '♕': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M4 18h16v2H4v-2zm1-4l2-8 2 4 3-6 3 6 2-4 2 8H5zm7-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
      </svg>
    ),
    '♖': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M6 4h2v2h2V4h4v2h2V4h2v4H6V4zm0 6h12v8H6v-8zm0 10h12v2H6v-2z" />
      </svg>
    ),
    '♗': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M12 2l6 6-2 2-4-4-4 4-2-2 6-6zm0 8c-2 0-4 2-4 4v4h8v-4c0-2-2-4-4-4zm-6 12h12v2H6v-2z" />
      </svg>
    ),
    '♘': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M8 4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2l-2 2h2l2 4-2 2v4H8v-4l-2-2 2-4h2l-2-2V4zm-2 16h12v2H6v-2z" />
      </svg>
    ),
    '♙': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <circle cx="12" cy="8" r="3" />
        <path d="M12 12c-2 0-3 1-3 3v3h6v-3c0-2-1-3-3-3zm-4 8h8v2H8v-2z" />
      </svg>
    ),
    // Black pieces
    '♚': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M12 2l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3L12 2zm0 6c-2.5 0-4.5 2-4.5 4.5V18h9v-5.5c0-2.5-2-4.5-4.5-4.5zm-6 12h12v2H6v-2z" />
      </svg>
    ),
    '♛': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M4 18h16v2H4v-2zm1-4l2-8 2 4 3-6 3 6 2-4 2 8H5zm7-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
      </svg>
    ),
    '♜': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M6 4h2v2h2V4h4v2h2V4h2v4H6V4zm0 6h12v8H6v-8zm0 10h12v2H6v-2z" />
      </svg>
    ),
    '♝': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M12 2l6 6-2 2-4-4-4 4-2-2 6-6zm0 8c-2 0-4 2-4 4v4h8v-4c0-2-2-4-4-4zm-6 12h12v2H6v-2z" />
      </svg>
    ),
    '♞': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <path d="M8 4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2l-2 2h2l2 4-2 2v4H8v-4l-2-2 2-4h2l-2-2V4zm-2 16h12v2H6v-2z" />
      </svg>
    ),
    '♟': (
      <svg viewBox="0 0 24 24" className={`w-full h-full ${className}`} fill={pieceColor}>
        <circle cx="12" cy="8" r="3" />
        <path d="M12 12c-2 0-3 1-3 3v3h6v-3c0-2-1-3-3-3zm-4 8h8v2H8v-2z" />
      </svg>
    ),
  };

  return (
    <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      {pieceComponents[piece] || null}
    </div>
  );
};