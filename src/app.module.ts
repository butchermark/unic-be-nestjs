import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/User.schema';
import { Book, BookSchema } from './schemas/Book.schema';
import { Review, ReviewSchema } from './schemas/Review.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/unic-be-nestjs'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
