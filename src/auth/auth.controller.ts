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

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async registration(@Body() user: AuthDto): Promise<User> {
    console.log(user.email);
    return await this.authService.register(user);
  }

  @ApiBody({ type: AuthDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in. Returns a JWT token.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthDto, @Res() res: Response): Promise<Object> {
    const jwt = await this.authService.signin(dto);
    res.setHeader('Authorization', 'Bearer ' + jwt.accesstoken);
    return res.json(jwt);
  }

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
  @HttpCode(HttpStatus.OK)
  @Get('validate')
  async validate(@Req() req: Request): Promise<Object> {
    const user = await this.authService.validateUser(req.headers.authorization);
    return { message: 'token is valid', user: user };
  }

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
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async validateRefreshToken(@Body() refreshTokenDto: string): Promise<any> {
    return this.authService.validateRefreshToken(refreshTokenDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'userId',
    description: 'The ID of the user to retrieve refresh token for.',
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
  @HttpCode(HttpStatus.OK)
  @Get('user-refresh-token')
  async getUserRefreshToken(
    @Query('userId') userId: string,
  ): Promise<RefreshTokenDto> {
    const refreshToken = await this.authService.getUserRefreshToken(userId);
    return { refreshToken };
  }
}
