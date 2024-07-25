import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The content of the review',
    example: 'Great book! Really enjoyed it.',
    type: String,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'The rating given in the review, between 1 and 5',
    example: 4,
    type: Number,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description:
      'The ID of the user who wrote the review. This field is optional.',
    example: '60d21b4667d0d8992e610c85',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  userId?: string;
}
