import { BorrowingRepository } from "../repositories/borrowing.repository";
import { AppError } from "../middlewares/error.middleware";
import { Fine } from "../models/Fine.model";

export class BorrowingService {
  static async issueBook(data: any) {
    return BorrowingRepository.issueBook(data);
  }

  static async returnBook(borrowingId: string, returnData: any) {
    const borrowing = await BorrowingRepository.returnBook(
      borrowingId,
      returnData,
    );

    // Auto create fine if any
    if (returnData.fineAmount && returnData.fineAmount > 0) {
      await Fine.create({
        borrowing: borrowing._id,
        member: borrowing.member,
        amount: returnData.fineAmount,
        status: "pending",
      });
    }

    return borrowing;
  }

  static async getMemberBorrowings(memberId: string) {
    return BorrowingRepository.getBorrowingsByMember(memberId);
  }
}
