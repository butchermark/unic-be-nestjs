import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/Book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getBook(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    return this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
  }

  async deleteBook(id: string): Promise<Book | null> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
