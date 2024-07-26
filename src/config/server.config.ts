export const PORT = process.env.PORT || 4000;

export enum GameTypes {
  Sudoku = 'Sudoku',
  //   here we can add more types of games
}

export enum GameDifficulties {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export const GameTiming: any = {};

// Sudoku config
GameTiming[GameTypes.Sudoku] = {};
GameTiming[GameTypes.Sudoku][GameDifficulties.Easy] = 10;
GameTiming[GameTypes.Sudoku][GameDifficulties.Medium] = 8;
GameTiming[GameTypes.Sudoku][GameDifficulties.Hard] = 5;
