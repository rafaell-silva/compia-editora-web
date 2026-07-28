'use client';
import { useMemo } from 'react';

export default function QRCode({ value, size = 200 }) {
  const grid = useMemo(() => {
    const size = 21;
    const matrix = [];
    
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        matrix[i][j] = false;
      }
    }
    
    const addFinderPattern = (row, col) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (i === 0 || i === 6 || j === 0 || j === 6 ||
              (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
            matrix[row + i][col + j] = true;
          }
        }
      }
    };
    
    addFinderPattern(0, 0);
    addFinderPattern(0, 14);
    addFinderPattern(14, 0);
    
    for (let i = 8; i < 13; i++) {
      matrix[8][i] = i % 2 === 0;
      matrix[i][8] = i % 2 === 0;
    }
    
    const seed = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let random = seed;
    const pseudoRandom = () => {
      random = (random * 1103515245 + 12345) & 0x7fffffff;
      return random / 0x7fffffff;
    };
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j]) continue;
        if (i < 9 && j < 9) continue;
        if (i < 9 && j > 11) continue;
        if (i > 11 && j < 9) continue;
        if (i === 8 || j === 8) continue;
        
        matrix[i][j] = pseudoRandom() > 0.55;
      }
    }
    
    return matrix;
  }, [value]);

  const pixelSize = size / 21;
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: 'white' }}
    >
      {grid.map((row, i) => 
        row.map((cell, j) => 
          cell ? (
            <rect
              key={`${i}-${j}`}
              x={j * pixelSize}
              y={i * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill="#000000"
            />
          ) : null
        )
      )}
      <rect
        x={9 * pixelSize}
        y={9 * pixelSize}
        width={3 * pixelSize}
        height={3 * pixelSize}
        fill="#8B0000"
        rx={pixelSize / 2}
      />
    </svg>
  );
}
