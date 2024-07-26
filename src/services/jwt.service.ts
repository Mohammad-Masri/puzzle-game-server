import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { MyConfigService } from './config.service';

@Injectable()
export class JWTService {
  private JWTPrivateKey;

  constructor(private myConfigService: MyConfigService) {
    this.JWTPrivateKey = this.myConfigService.getConfig('JWT_PRIVATE_KEY');
  }

  async generateToken(userId: string) {
    const token = await jwt.sign({ userId }, this.JWTPrivateKey, {
      expiresIn: '12h',
    });

    return token;
  }

  async verifyToken(token: string) {
    try {
      const payload = await jwt.verify(token, this.JWTPrivateKey + '');
      return payload;
    } catch (error) {
      return null;
    }
  }

  async isTokenValid(token: string) {
    const payload = await this.verifyToken(token);
    return payload ? true : false;
  }
}
