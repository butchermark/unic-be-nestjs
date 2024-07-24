import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    description: 'Title of the book',
    example: 'The Great Gatsby',
    required: false,
    type: String,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({
    description: 'Author of the book',
    example: 'F. Scott Fitzgerald',
    required: false,
    type: String,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  readonly author?: string;

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
    required: false,
    type: Number,
    minimum: 1,
    maximum: 2000,
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(2000)
  readonly pages?: number;
}
