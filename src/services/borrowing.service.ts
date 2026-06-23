import { BorrowingRepository } from "../repositories/borrowing.repository";
import { AppError } from "../middlewares/error.middleware";

export class BorrowingService {
  static async issueBook(data: any) {
    // Add business logic like checking borrowing limit here in future
    return BorrowingRepository.issueBook(data);
  }

  static async returnBook(borrowingId: string, returnData: any) {
    return BorrowingRepository.returnBook(borrowingId, returnData);
  }

  static async getMemberBorrowings(memberId: string) {
    return BorrowingRepository.getBorrowingsByMember(memberId);
  }
}
