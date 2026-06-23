import { Borrowing, IBorrowing } from "../models/Borrowing.model";
import { Book } from "../models/Book.model";
import { Member } from "../models/Member.model";
import { AppError } from "../middlewares/error.middleware";

export class BorrowingRepository {
  static async issueBook(data: Partial<IBorrowing>) {
    // Check availability
    const book = await Book.findById(data.book);
    if (!book || book.availableCopies <= 0) {
      throw new AppError("Book is not available", 400);
    }

    const borrowing = await Borrowing.create(data);

    // Update book and member counts
    await Book.findByIdAndUpdate(data.book, {
      $inc: { availableCopies: -1 },
    });

    await Member.findByIdAndUpdate(data.member, {
      $inc: { currentBorrowedCount: 1 },
    });

    return borrowing;
  }

  static async returnBook(
    borrowingId: string,
    returnData: { fineAmount?: number; notes?: string },
  ) {
    const borrowing = await Borrowing.findById(borrowingId);
    if (!borrowing || borrowing.status !== "active") {
      throw new AppError("Borrowing record not found or already returned", 404);
    }

    borrowing.returnDate = new Date();
    borrowing.status = "returned";
    borrowing.fineAmount = returnData.fineAmount || 0;
    borrowing.notes = returnData.notes;

    await borrowing.save();

    // Update book and member
    await Book.findByIdAndUpdate(borrowing.book, {
      $inc: { availableCopies: 1 },
    });

    await Member.findByIdAndUpdate(borrowing.member, {
      $inc: { currentBorrowedCount: -1 },
    });

    return borrowing;
  }

  static async getBorrowingsByMember(memberId: string) {
    return Borrowing.find({ member: memberId })
      .populate("book", "title author isbn")
      .populate("issuedBy", "name");
  }
}
