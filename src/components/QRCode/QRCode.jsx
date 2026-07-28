'use client';
import { useMemo } from 'react';

const GRID_SIZE = 21;
const FINDER_PATTERN_SIZE = 7;

function createEmptyMatrix() {
  return Array.from({ length: GRID_SIZE }, () => 
    Array.from({ length: GRID_SIZE }, () => false)
  );
}

function addFinderPattern(matrix, row, col) {
  for (let i = 0; i < FINDER_PATTERN_SIZE; i++) {
    for (let j = 0; j < FINDER_PATTERN_SIZE; j++) {
      const isBorder = i === 0 || i === 6 || j === 0 || j === 6;
      const isInnerSquare = i >= 2 && i <= 4 && j >= 2 && j <= 4;
      if (isBorder || isInnerSquare) {
        matrix[row + i][col + j] = true;
      }
    }
  }
}

function addFinderPatterns(matrix) {
  addFinderPattern(matrix, 0, 0);
  addFinderPattern(matrix, 0, 14);
  addFinderPattern(matrix, 14, 0);
}

function addAlignmentPatterns(matrix) {
  for (let i = 8; i < 13; i++) {
    matrix[8][i] = i % 2 === 0;
    matrix[i][8] = i % 2 === 0;
  }
}

function createPseudoRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

function isReservedArea(row, col) {
  if (row < 9 && col < 9) return true;
  if (row < 9 && col > 11) return true;
  if (row > 11 && col < 9) return true;
  if (row === 8 || col === 8) return true;
  return false;
}

function fillDataArea(matrix, random) {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (!matrix[i][j] && !isReservedArea(i, j)) {
        matrix[i][j] = random() > 0.55;
      }
    }
  }
}

function generateGrid(value) {
  const matrix = createEmptyMatrix();
  addFinderPatterns(matrix);
  addAlignmentPatterns(matrix);
  
  const seed = value.split('').reduce((acc, char) => acc + char.codePointAt(0), 0);
  const random = createPseudoRandom(seed);
  fillDataArea(matrix, random);
  
  return matrix;
}

export default function QRCode({ value, size = 200 }) {
  const grid = useMemo(() => generateGrid(value), [value]);
  const pixelSize = size / GRID_SIZE;
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: 'white' }}
    >
      {renderPixels(grid, pixelSize)}
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

function renderPixels(grid, pixelSize) {
  return grid.flatMap((row, i) => 
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
  );
}
