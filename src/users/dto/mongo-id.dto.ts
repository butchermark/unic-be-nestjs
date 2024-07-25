import { IsMongoId, IsNotEmpty } from 'class-validator';

export class MongoIdDto {
  @IsMongoId({ message: 'Id must be a valid mongo id' })
  @IsNotEmpty({ message: 'Id is required' })
  id: string;
}
