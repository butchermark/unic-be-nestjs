import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Review } from './Review.schema';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  pages: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews?: Review[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
