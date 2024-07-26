import { GameDifficulties } from 'src/config/server.config';

interface GameGenerator {
  generateBoard(difficulty: GameDifficulties): any;
}

export class SudokuGameHelper implements GameGenerator {
  private static instance: SudokuGameHelper;
  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  static getInstance(): SudokuGameHelper {
    if (!SudokuGameHelper.instance) {
      SudokuGameHelper.instance = new SudokuGameHelper();
    }
    return SudokuGameHelper.instance;
  }

  generateBoard(difficulty: GameDifficulties) {
    // Helper function to check if a number is valid in a position
    function isValid(board, row, col, num) {
      for (let i = 0; i < 9; i++) {
        if (
          board[row][i] === num ||
          board[i][col] === num ||
          board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
            3 * Math.floor(col / 3) + (i % 3)
          ] === num
        ) {
          return false;
        }
      }
      return true;
    }

    // Helper function to generate a complete valid Sudoku board
    function generateBoard() {
      const board = Array.from({ length: 9 }, () => Array(9).fill(0));

      function fillBoard(board) {
        for (let i = 0; i < 81; i++) {
          const row = Math.floor(i / 9);
          const col = i % 9;
          if (board[row][col] === 0) {
            const numbers = shuffle(Array.from({ length: 9 }, (_, i) => i + 1));
            for (let num of numbers) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (fillBoard(board)) {
                  return true;
                }
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
        return true;
      }

      fillBoard(board);
      return board;
    }

    // Helper function to shuffle an array
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Remove cells based on difficulty level
    function removeCells(board, difficulty) {
      const levels = { easy: 36, medium: 46, hard: 56 }; // Number of cells to remove
      const cellsToRemove = levels[difficulty] || 46; // Default to medium if unknown level
      for (let i = 0; i < cellsToRemove; i++) {
        let row, col;
        do {
          row = Math.floor(Math.random() * 9);
          col = Math.floor(Math.random() * 9);
        } while (board[row][col] === 0);
        board[row][col] = 0;
      }
      return board;
    }

    const board = generateBoard();
    return removeCells(board, difficulty);
  }
}
