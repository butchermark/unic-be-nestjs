import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/schemas/User.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The list of users has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'The user was not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getMe(): Promise<User> {
    return this.usersService.getMe();
  }

  @ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'The user was not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getUser(id);
  }

  @ApiParam({ name: 'id', description: 'The ID of the user to delete' })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'The user was not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
