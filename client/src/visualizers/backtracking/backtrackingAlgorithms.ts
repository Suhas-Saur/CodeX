import { AlgoStep } from '../../engine/types';

export interface BacktrackingStep extends AlgoStep {
  extra: {
    board: number[][]; // 0=empty, 1=queen/filled, 2=attacked
    currentRow?: number;
    currentCol?: number;
    action: 'place' | 'check' | 'backtrack' | 'success' | 'start';
  };
}

export function nQueensSteps(n: number): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const board = Array(n).fill(null).map(() => Array(n).fill(0));
  
  function isSafe(row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false;
      if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) return false;
      if (col + (row - i) < n && board[i][col + (row - i)] === 1) return false;
    }
    return true;
  }
  
  function solve(row: number): boolean {
    if (row === n) {
      steps.push({ type: 'success', description: `Solution found! All ${n} queens placed.`, indices: [], extra: { board: board.map(r => [...r]), action: 'success', currentRow: row, currentCol: 0 } });
      return true;
    }
    for (let col = 0; col < n; col++) {
      steps.push({ type: 'compare', description: `Row ${row+1}: Trying column ${col+1}. Is it safe?`, indices: [row, col], extra: { board: board.map(r => [...r]), action: 'check', currentRow: row, currentCol: col } });
      if (isSafe(row, col)) {
        board[row][col] = 1;
        steps.push({ type: 'place', description: `Safe! Placing queen at row ${row+1}, col ${col+1}`, indices: [row, col], extra: { board: board.map(r => [...r]), action: 'place', currentRow: row, currentCol: col } });
        if (solve(row + 1)) return true;
        board[row][col] = 0;
        steps.push({ type: 'backtrack', description: `Backtracking: No solution with queen at row ${row+1}, col ${col+1}. Removing queen.`, indices: [row, col], extra: { board: board.map(r => [...r]), action: 'backtrack', currentRow: row, currentCol: col } });
      } else {
        steps.push({ type: 'error', description: `Not safe at row ${row+1}, col ${col+1} - conflict detected!`, indices: [row, col], extra: { board: board.map(r => [...r]), action: 'check', currentRow: row, currentCol: col } });
      }
    }
    return false;
  }
  
  steps.push({ type: 'info', description: `Solving ${n}-Queens problem using backtracking`, indices: [], extra: { board: board.map(r => [...r]), action: 'start', currentRow: 0, currentCol: 0 } });
  solve(0);
  return steps;
}

export function sudokuSteps(board: number[][]): AlgoStep[] { return []; }
export function ratInMazeSteps(maze: number[][]): AlgoStep[] { return []; }
export function permutationsSteps(arr: number[]): AlgoStep[] { return []; }
