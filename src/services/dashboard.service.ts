import { Book } from "../models/Book.model";
import { Member } from "../models/Member.model";
import { Borrowing } from "../models/Borrowing.model";

export class DashboardService {
  static async getStats() {
    const totalBooks = await Book.countDocuments({ isDeleted: false });
    const availableBooks = await Book.countDocuments({
      isDeleted: false,
      status: "available",
    });
    const totalMembers = await Member.countDocuments({ status: "active" });
    const activeBorrowings = await Borrowing.countDocuments({
      status: "active",
    });
    const overdue = await Borrowing.countDocuments({
      status: "active",
      dueDate: { $lt: new Date() },
    });

    return {
      totalBooks,
      availableBooks,
      totalMembers,
      activeBorrowings,
      overdue,
    };
  }
}
