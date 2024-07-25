import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from 'src/schemas/review.schema';
import { MongoIdDto } from 'src/users/dto/mongo-id.dto';

@ApiTags('reviews')
@Controller('books/:bookId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
    type: Review,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Authentication required.',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createReview(
    @Param('bookId') bookId: MongoIdDto,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return await this.reviewsService.createReview(bookId, createReviewDto);
  }

  @ApiParam({
    name: 'bookId',
    description: 'The ID of the book',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description:
      'The list of reviews for the specified book has been successfully retrieved.',
    type: [Review],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getReviewsByBook(
    @Param('bookId') bookId: MongoIdDto,
  ): Promise<Review[]> {
    return await this.reviewsService.getReviewsByBook(bookId);
  }

  @ApiParam({ name: 'id', description: 'The ID of the review to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully retrieved.',
    type: Review,
  })
  @ApiResponse({ status: 404, description: 'The review was not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  @Get('reviews/:id')
  async getReview(@Param('id') id: MongoIdDto): Promise<Review | null> {
    return await this.reviewsService.getReview(id);
  }

  @ApiParam({ name: 'id', description: 'The ID of the review to update' })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully updated.',
    type: Review,
  })
  @ApiResponse({ status: 404, description: 'The review was not found.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Authentication required.',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('reviews/:id')
  async updateReview(
    @Param('id') id: MongoIdDto,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review | null> {
    return await this.reviewsService.updateReview(id, updateReviewDto);
  }

  @ApiParam({ name: 'id', description: 'The ID of the review to delete' })
  @ApiResponse({
    status: 204,
    description: 'The review has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'The review was not found.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Authentication required.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('reviews/:id')
  async deleteReview(@Param('id') id: MongoIdDto): Promise<void> {
    return await this.reviewsService.deleteReview(id);
  }
}
