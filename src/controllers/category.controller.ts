import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json({ success: true, data: category });
  }

  static async getCategories(req: Request, res: Response) {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  }
}
