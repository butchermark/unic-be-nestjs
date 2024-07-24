import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description:
      'The full name of the user. This should be a non-empty string.',
    type: String,
    required: true,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  readonly username: string;

  @ApiProperty({
    example: 'jdoe@me.com',
    description: 'The email address of the user. Must be a valid email format.',
    type: String,
    required: true,
    format: 'email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    description:
      'The password for the user account. Should be a non-empty string.',
    type: String,
    required: true,
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly password: string;
}
