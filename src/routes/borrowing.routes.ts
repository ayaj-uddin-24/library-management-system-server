import { Router } from "express";
import { BorrowingController } from "../controllers/borrowing.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/issue",
  authenticate,
  authorize(["super_admin", "admin", "librarian"]),
  BorrowingController.issueBook,
);
router.put(
  "/return/:id",
  authenticate,
  authorize(["super_admin", "admin", "librarian"]),
  BorrowingController.returnBook,
);
router.get(
  "/member/:memberId",
  authenticate,
  BorrowingController.getMemberBorrowings,
);

export default router;
