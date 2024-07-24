import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({
    description:
      'The content of the review. If provided, it should be a string with meaningful text.',
    example: 'Updated review text to reflect more recent thoughts.',
    required: false,
    type: String,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  readonly content?: string;

  @ApiProperty({
    description:
      'The rating given in the review, ranging from 1 to 5 stars. This field is optional.',
    example: 5,
    required: false,
    type: Number,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  readonly rating?: number;

  @ApiProperty({
    description:
      'The ID of the user who wrote the review. This is optional and may not always be included.',
    example: '60d21b4667d0d8992e610c85',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  readonly userId?: string;
}
