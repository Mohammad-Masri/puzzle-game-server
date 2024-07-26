import { ApiProperty } from '@nestjs/swagger';
import { GameDifficulties, GameTypes } from 'src/config/server.config';

export class StartGameBody {
  @ApiProperty({ enum: GameTypes })
  type: GameTypes;
  @ApiProperty({ enum: GameDifficulties })
  difficulty: GameDifficulties;
}
