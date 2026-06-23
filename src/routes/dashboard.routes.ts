import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/stats", authenticate, DashboardController.getDashboardStats);

export default router;
