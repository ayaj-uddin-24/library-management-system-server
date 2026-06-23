import { Router } from "express";
import { ReservationController } from "../controllers/reservation.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, ReservationController.create);
router.get(
  "/member/:memberId",
  authenticate,
  ReservationController.getByMember,
);

export default router;
