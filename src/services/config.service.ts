import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyConfigService {
  constructor(private configService: ConfigService) {}

  getConfig<T>(key: string) {
    return this.configService.get<T>(key);
  }
}
