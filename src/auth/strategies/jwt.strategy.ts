import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { CustomUnauthorizedException } from '../../exceptions/custom-unauthorized.exception'; // Adjust the import path as necessary

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      if (new Date(payload.exp * 1000) < new Date()) {
        console.log('Token expired');
        const refreshToken = await this.authService.getUserRefreshToken(
          payload.sub,
        );
        if (!refreshToken) {
          throw new CustomUnauthorizedException(
            'Token expired and no refresh token available',
          );
        }

        const tokens =
          await this.authService.validateRefreshToken(refreshToken);
        console.log('New tokens', tokens);
      }

      if (!payload?.sub) {
        throw new CustomUnauthorizedException('Invalid token');
      }

      console.log('Valid payload', payload);
      return payload;
    } catch (error) {
      throw new CustomUnauthorizedException('Invalid token: ' + error.message);
    }
  }
}
