import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_MODULES, DB_URL } from './config/database.config';
import { GameSchema } from './schemas/game.schema';
import { UserSchema } from './schemas/user.schema';
import { AuthModule } from './controllers/auth/auth.module';
import { GameModule } from './controllers/game/game.module';
import { GameGateway } from './gateways/game.gateways';
import { GameService } from './services/game.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(DB_URL),
    MongooseModule.forFeature([
      {
        name: DB_MODULES.USER,
        schema: UserSchema,
      },
      {
        name: DB_MODULES.GAME,
        schema: GameSchema,
      },
    ]),
    AuthModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService, GameGateway, GameService],
})
export class AppModule {}
