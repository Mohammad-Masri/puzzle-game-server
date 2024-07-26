import mongoose, { ObjectId, Schema } from 'mongoose';
import { DB_MODULES } from 'src/config/database.config';
import { GameDifficulties, GameTypes } from 'src/config/server.config';

export interface IGame {
  _id: ObjectId;
  user: ObjectId;
  type: GameTypes;
  difficulty: GameDifficulties;
  board: any;
  isRunning: boolean;
  durationInMinutes: number;
  scour: number;
  finishAt: Date;
}

export const GameSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: DB_MODULES.USER },
    type: { type: String, enum: GameTypes },
    difficulty: { type: String, enum: GameDifficulties },
    board: { type: Object },
    isRunning: { type: Boolean, default: true },
    durationInMinutes: Number,
    scour: { type: Number, default: 0 },
    finishAt: Date,
  },
  { timestamps: true },
);
