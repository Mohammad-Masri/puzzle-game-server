import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTService } from 'src/services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private JWTService: JWTService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization: string = request.headers.authorization;

    return this.JWTService.isTokenValid(authorization);
  }
}
