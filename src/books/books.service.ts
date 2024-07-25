import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/Book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { MongoIdDto } from 'src/users/dto/mongo-id.dto';
import { BookNotFoundException } from 'src/exceptions/book-not-found.exception';

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

  async getBook(id: MongoIdDto): Promise<Book | null> {
    const book = this.bookModel.findById(id).exec();
    if (!book) {
      throw new BookNotFoundException(id);
    }
    return book;
  }

  async updateBook(
    id: MongoIdDto,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    const book = this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();

    if (!book) {
      throw new BookNotFoundException(id);
    }

    return book;
  }

  async deleteBook(id: MongoIdDto): Promise<Book | null> {
    const book = this.bookModel.findByIdAndDelete(id).exec();
    if (!book) {
      throw new BookNotFoundException(id);
    }

    return book;
  }
}
