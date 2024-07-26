import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginBody, LoginResponse, RegisterBody } from './dto';
import { UserService } from 'src/services/user.service';
import { JWTService } from 'src/services/jwt.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { BcryptHelper } from 'src/helpers/bcrypt.helper';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private JWTService: JWTService,
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@Request() req) {
    const payload = await this.JWTService.verifyToken(
      req.headers.authorization,
    );
    const { userId } = payload;

    return await this.userService.findById(userId);
  }

  @Post('/login')
  async login(@Body() body: LoginBody) {
    const error = `Invalid Username/Password`;

    const user = await this.userService.findByUsername(body.username);
    if (user == undefined) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(error),
        },
      );
    }

    const isValid = await BcryptHelper.comparePassword(
      body.password,
      user.password,
    );

    if (!isValid) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(error),
        },
      );
    }

    const token = await this.JWTService.generateToken(user._id + '');

    return new LoginResponse(user, token);
  }

  @Post('/register')
  register(@Body() body: RegisterBody) {
    return this.userService.create(body.name, body.username, body.password);
  }
}
