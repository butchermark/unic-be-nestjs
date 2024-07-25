import { HttpException, HttpStatus } from '@nestjs/common';

export class BookNotFoundException extends HttpException {
  constructor(bookId) {
    super(`Book not found by id: ${bookId}`, HttpStatus.NOT_FOUND);
  }
}
