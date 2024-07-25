import { HttpException, HttpStatus } from '@nestjs/common';

export class ReviewNotFoundException extends HttpException {
  constructor(reviewId) {
    super(`Review not found by id: ${reviewId}`, HttpStatus.NOT_FOUND);
  }
}
