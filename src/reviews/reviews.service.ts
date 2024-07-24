import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async createReview(
    bookId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const newReview = new this.reviewModel({ ...createReviewDto, bookId });
    return newReview.save();
  }

  async getReviewsByBook(bookId: string): Promise<Review[]> {
    return this.reviewModel.find({ bookId }).exec();
  }

  async getReview(id: string): Promise<Review | null> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async updateReview(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review | null> {
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
    if (!updatedReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return updatedReview;
  }

  async deleteReview(id: string): Promise<void> {
    const result = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }
}
