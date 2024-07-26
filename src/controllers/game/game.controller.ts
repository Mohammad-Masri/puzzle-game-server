import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { StartGameBody } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { GameService } from 'src/services/game.service';
import { JWTService } from 'src/services/jwt.service';
import { GameDifficulties, GameTypes } from 'src/config/server.config';

@Controller('game')
@UseGuards(AuthGuard)
@ApiTags('Game')
export class GameController {
  constructor(
    private gameService: GameService,
    private JWTService: JWTService,
  ) {}

  @Get('/available-games')
  getAvailableGames() {
    return Object.keys(GameTypes).map((v) => v);
  }

  @Get('/difficulties')
  getDifficulties() {
    return Object.keys(GameDifficulties).map((v) => v);
  }

  @Post('/start')
  async start(@Body() body: StartGameBody, @Request() req) {
    const payload = await this.JWTService.verifyToken(
      req.headers.authorization,
    );
    const { userId } = payload;

    const game = await this.gameService.create(
      userId,
      body.type,
      body.difficulty,
    );
    return game;
  }
}
