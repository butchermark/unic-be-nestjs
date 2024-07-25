import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { MongoIdDto } from 'src/users/dto/mongo-id.dto';
import { ReviewNotFoundException } from 'src/exceptions/review-not-found.exception';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async createReview(
    bookId: MongoIdDto,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const newReview = new this.reviewModel({
      ...createReviewDto,
      bookId,
    });
    return newReview.save();
  }

  async getReviewsByBook(bookId: MongoIdDto): Promise<Review[]> {
    const reviews = await this.reviewModel.find({ bookId }).exec();
    if (!reviews) {
      throw new ReviewNotFoundException(bookId);
    }
    return reviews;
  }

  async getReview(id: MongoIdDto): Promise<Review | null> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new ReviewNotFoundException(id);
    }
    return review;
  }

  async updateReview(
    id: MongoIdDto,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review | null> {
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
    if (!updatedReview) {
      throw new ReviewNotFoundException(id);
    }
    return updatedReview;
  }

  async deleteReview(id: MongoIdDto): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new ReviewNotFoundException(id);
    }
  }
}
