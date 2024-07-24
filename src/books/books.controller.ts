import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from 'src/schemas/Book.schema';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBody({ type: CreateBookDto })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The list of books has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  @ApiParam({ name: 'id', description: 'The ID of the book to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'The book was not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.getBook(id);
  }

  @ApiParam({ name: 'id', description: 'The ID of the book to update' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'The book was not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @ApiParam({ name: 'id', description: 'The ID of the book to delete' })
  @ApiResponse({
    status: 204,
    description: 'The book has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'The book was not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.deleteBook(id);
  }
}
