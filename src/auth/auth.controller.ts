import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/auth.guard';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from 'src/schemas/User.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBody({ type: AuthDto, description: 'User registration data.' })
  @ApiResponse({
    status: 200,
    description: 'User successfully registered.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async registration(@Body() user: AuthDto): Promise<User> {
    return await this.authService.register(user);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: AuthDto, description: 'User sign-in data.' })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in. Returns a JWT token.',
    schema: {
      example: {
        accessToken: 'string',
        refreshToken: 'string',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('signin')
  async signin(@Body() dto: AuthDto, @Res() res: Response): Promise<Object> {
    const jwt = await this.authService.signin(dto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accesstoken);
    return res.json(jwt);
  }

  @Get('validate')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Validates the JWT token.',
    schema: {
      example: {
        message: 'token is valid',
        user: {},
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async validate(@Req() req: Request): Promise<Object> {
    const user = await this.authService.validateUser(req.headers.authorization);
    return { message: 'token is valid', user: user };
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: String, description: 'Refresh token string.' })
  @ApiResponse({
    status: 200,
    description: 'Returns a new access token.',
    schema: {
      example: {
        accessToken: 'string',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async validateRefreshToken(@Body() refreshTokenDto: string): Promise<any> {
    return this.authService.validateRefreshToken(refreshTokenDto);
  }

  @Get('user-refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'userId',
    description: 'The ID of the user to retrieve refresh token for.',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the refresh token for the user.',
    schema: {
      example: {
        refreshToken: 'string',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getUserRefreshToken(
    @Query('userId') userId: string,
  ): Promise<RefreshTokenDto> {
    const refreshToken = await this.authService.getUserRefreshToken(userId);
    return { refreshToken };
  }
}
