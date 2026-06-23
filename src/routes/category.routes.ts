import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(["super_admin", "admin", "librarian"]),
  CategoryController.createCategory,
);
router.get("/", CategoryController.getCategories);

export default router;
