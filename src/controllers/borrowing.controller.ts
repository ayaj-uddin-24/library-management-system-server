import { Request, Response } from "express";
import { BorrowingService } from "../services/borrowing.service";

export class BorrowingController {
  static async issueBook(req: Request, res: Response) {
    const borrowing = await BorrowingService.issueBook(req.body);
    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: borrowing,
    });
  }

  static async returnBook(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const borrowing = await BorrowingService.returnBook(id, req.body);
    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: borrowing,
    });
  }

  static async getMemberBorrowings(req: Request, res: Response) {
    const memberId = Array.isArray(req.params.memberId)
      ? req.params.memberId[0]
      : req.params.memberId;
    const borrowings = await BorrowingService.getMemberBorrowings(memberId);
    res.status(200).json({
      success: true,
      data: borrowings,
    });
  }
}
