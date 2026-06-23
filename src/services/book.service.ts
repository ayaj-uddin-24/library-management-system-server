import { BookRepository } from "../repositories/book.repository";
import { AppError } from "../middlewares/error.middleware";
import { IBook } from "../models/Book.model";

export class BookService {
  static async createBook(bookData: Partial<IBook>) {
    // Check if ISBN or barcode already exists
    const existingIsbn = await BookRepository.findByIsbn(bookData.isbn!);
    if (existingIsbn) {
      throw new AppError("Book with this ISBN already exists", 409);
    }

    return BookRepository.create(bookData);
  }

  static async getBooks(page: number, limit: number) {
    return BookRepository.getAll(page, limit);
  }

  static async getBookById(id: string) {
    const book = await BookRepository.findById(id);
    if (!book) throw new AppError("Book not found", 404);
    return book;
  }

  static async updateBook(id: string, updateData: Partial<IBook>) {
    const book = await BookRepository.update(id, updateData);
    if (!book) throw new AppError("Book not found", 404);
    return book;
  }

  static async deleteBook(id: string) {
    const book = await BookRepository.softDelete(id);
    if (!book) throw new AppError("Book not found", 404);
    return book;
  }
}
