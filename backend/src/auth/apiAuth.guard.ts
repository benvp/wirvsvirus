import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, payload, info) {
    if (payload)
      return payload;
    else {
      if (info.name === 'TokenExpiredError') {
        return new UnauthorizedException('Token is expired.');
      }

      return new UnauthorizedException();
    }
  }
}
