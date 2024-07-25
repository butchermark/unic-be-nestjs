import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async register(dto: AuthDto): Promise<any> {
    const user = await this.userModel.findOne({ email: dto.email }).exec();
    if (user) {
      throw new UnauthorizedException('User does already exist', dto.email);
    } else {
      const hashedPassword = await crypto
        .createHmac('sha256', process.env.USER_SALT)
        .update(dto.password)
        .digest('base64');

      const newUser = new this.userModel({
        email: dto.email,
        password: hashedPassword,
      });

      await newUser.save();
    }
  }

  async signin(dto: AuthDto): Promise<any> {
    const user = await this.userModel.findOne({ email: dto.email }).exec();
    if (!user) {
      throw new UnauthorizedException('User does not exist', dto.email);
    }

    const hashedPassword = crypto
      .createHmac('sha256', process.env.USER_SALT)
      .update(dto.password)
      .digest('base64');
    dto.password = hashedPassword;

    if (dto.password !== user.password || user.email !== dto.email)
      throw new UnauthorizedException('Password or email does not match');

    const tokens = await this.generateTokens(user);

    user.refreshToken = tokens.refreshToken;
    await user.save();

    return {
      tokens,
      user,
    };
  }

  async validateUser(authHeader: any): Promise<User> {
    try {
      const verifiedToken = await this.jwtService.verify(
        authHeader.split(' ')[1],
        { secret: process.env.JWT_SECRET },
      );

      const userId = verifiedToken.sub;

      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return verifiedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateRefreshToken(refreshToken: string) {
    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userModel.findById(sub).exec();
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = await this.generateTokens(user);

      user.refreshToken = tokens.refreshToken;
      await user.save();

      return tokens;
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getUserRefreshToken(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user.refreshToken;
  }

  private async generateTokens(user: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        user.id.toString(),
        process.env.JWT_ACCESS_TOKEN_TTL ?? '60s',
      ),
      this.signToken(
        user.id.toString(),
        process.env.JWT_REFRESH_TOKEN_TTL ?? '60000s',
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signToken(userId: string, expiresIn: string, payload?: any) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn,
      },
    );
  }
}
