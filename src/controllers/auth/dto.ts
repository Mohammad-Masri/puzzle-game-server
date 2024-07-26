import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/schemas/user.schema';

export class LoginBody {
  @ApiProperty({ type: String })
  username: string;
  @ApiProperty({ type: String })
  password: string;
}

export class RegisterBody {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  username: string;
  @ApiProperty({ type: String })
  password: string;
}

export class LoginResponse {
  token: string;

  id: string;
  name: string;

  constructor(user: IUser, token: string) {
    this.token = token;
    this.id = user._id + '';
    this.name = user.name;
  }
}
