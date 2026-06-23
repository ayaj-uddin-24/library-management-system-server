import { Category } from "../models/Category.model";
import { AppError } from "../middlewares/error.middleware";

export class CategoryService {
  static async createCategory(data: any) {
    const existing = await Category.findOne({ name: data.name });
    if (existing) throw new AppError("Category already exists", 409);
    return Category.create(data);
  }

  static async getAllCategories() {
    return Category.find({ isActive: true }).populate("parent", "name");
  }
}
