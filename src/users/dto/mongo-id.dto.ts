import { IsMongoId, IsNotEmpty } from 'class-validator';

export class MongoIdDto {
  //Ezek a validátorok valamiért nem működnek megfelelően, ezért itt nem validálom az id-t.
  //@IsMongoId({ message: 'Id must be a valid mongo id' })
  //@IsNotEmpty
  id: string;
}
