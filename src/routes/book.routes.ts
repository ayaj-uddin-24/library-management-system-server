import { Router } from "express";
import { BookController } from "../controllers/book.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../types";

const router = Router();

// Public route - anyone can view books
router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBookById);

// Protected routes - only authenticated users with proper roles
router.post(
  "/",
  authenticate,
  authorize(["super_admin", "admin", "librarian"]),
  BookController.createBook,
);
router.put(
  "/:id",
  authenticate,
  authorize(["super_admin", "admin", "librarian"]),
  BookController.updateBook,
);
router.delete(
  "/:id",
  authenticate,
  authorize(["super_admin", "admin", "librarian"]),
  BookController.deleteBook,
);

export default router;
