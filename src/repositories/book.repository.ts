import { Book, IBook } from "../models/Book.model";
import { AppError } from "../middlewares/error.middleware";

export class BookRepository {
  static async create(bookData: Partial<IBook>): Promise<IBook> {
    return Book.create(bookData);
  }

  static async findById(id: string): Promise<IBook | null> {
    return Book.findOne({ _id: id, isDeleted: false });
  }

  static async findByIsbn(isbn: string): Promise<IBook | null> {
    return Book.findOne({ isbn, isDeleted: false });
  }

  static async getAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const books = await Book.find({ isDeleted: false })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments({ isDeleted: false });

    return { books, total, page, limit };
  }

  static async update(
    id: string,
    updateData: Partial<IBook>,
  ): Promise<IBook | null> {
    return Book.findOneAndUpdate({ _id: id, isDeleted: false }, updateData, {
      new: true,
    });
  }

  static async softDelete(id: string): Promise<IBook | null> {
    return Book.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
  }
}
