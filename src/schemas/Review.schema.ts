import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
