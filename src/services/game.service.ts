import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_MODULES } from 'src/config/database.config';
import {
  GameDifficulties,
  GameTiming,
  GameTypes,
} from 'src/config/server.config';
import { SudokuGameHelper } from 'src/helpers/game-generator.helper';
import { IGame } from 'src/schemas/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel(DB_MODULES.GAME) private GameModel: Model<IGame>) {}

  async findById(gameId: string) {
    return await this.GameModel.findById(gameId + '');
  }

  async findRunningGamesForUser(userId: string, type: GameTypes) {
    return await this.GameModel.find({
      user: userId + '',
      type,
      isRunning: true,
    });
  }

  async create(userId: string, type: GameTypes, difficulty: GameDifficulties) {
    // check if there is a game still running first

    const games = await this.findRunningGamesForUser(userId, type);
    if (games.length !== 0) return games[0];

    let board = null;
    switch (type) {
      case GameTypes.Sudoku:
        board = await SudokuGameHelper.getInstance().generateBoard(difficulty);

        break;

      default:
        const error = `this game ${type} is not supported yet`;
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: new Error(error),
          },
        );
        break;
    }

    const game = new this.GameModel({
      board,
      solutionBoard: board,
      difficulty,
      type,
      user: userId,
      durationInMinutes: GameTiming[type][difficulty],
    });

    return await game.save();
  }

  async updateGameCell(gameId: string, i: number, j: number, value: number) {
    const game = await this.findById(gameId);
    if (game) {
      const solutionBoard = JSON.parse(JSON.stringify(game.solutionBoard));

      if (solutionBoard[i][j] !== value) {
        solutionBoard[i][j] = value;
        game.solutionBoard = solutionBoard;

        await game.save();
      }
    }
  }
}
