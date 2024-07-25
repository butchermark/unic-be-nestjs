import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(userId) {
    super(`User not found by id: ${userId}`, HttpStatus.NOT_FOUND);
  }
}
