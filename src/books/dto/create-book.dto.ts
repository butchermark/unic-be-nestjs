import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'The Great Gatsby',
    type: String,
    maxLength: 255,
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Author of the book',
    example: 'F. Scott Fitzgerald',
    type: String,
    maxLength: 255,
  })
  @IsString()
  readonly author: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'A novel set in the Jazz Age on Long Island, near New York City.',
    required: false,
    type: String,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    description: 'Number of pages in the book',
    example: 180,
    type: Number,
    minimum: 1,
    maximum: 2000,
  })
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(2000)
  readonly pages: number;
}
