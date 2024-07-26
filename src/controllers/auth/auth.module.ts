import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_MODULES } from 'src/config/database.config';
import { UserSchema } from 'src/schemas/user.schema';
import { JWTService } from 'src/services/jwt.service';
import { MyConfigService } from 'src/services/config.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DB_MODULES.USER,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [UserService, JWTService, MyConfigService],
})
export class AuthModule {}
