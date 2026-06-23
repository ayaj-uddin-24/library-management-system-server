import { Request, Response } from "express";
import { BookService } from "../services/book.service";

export class BookController {
  static async createBook(req: Request, res: Response) {
    const book = await BookService.createBook(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  }

  static async getBooks(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await BookService.getBooks(page, limit);

    res.status(200).json({
      success: true,
      ...result,
    });
  }

  static async getBookById(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const book = await BookService.getBookById(id);
    res.status(200).json({
      success: true,
      data: book,
    });
  }

  static async updateBook(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const book = await BookService.updateBook(id, req.body);
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  }

  static async deleteBook(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await BookService.deleteBook(id);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  }
}
