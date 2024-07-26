import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from 'src/services/game.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_MODULES } from 'src/config/database.config';
import { GameSchema } from 'src/schemas/game.schema';
import { JWTService } from 'src/services/jwt.service';
import { MyConfigService } from 'src/services/config.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DB_MODULES.GAME,
        schema: GameSchema,
      },
    ]),
  ],
  controllers: [GameController],
  providers: [GameService, JWTService, MyConfigService],
})
export class GameModule {}
