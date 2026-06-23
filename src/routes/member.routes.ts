import { Router } from "express";
import { MemberController } from "../controllers/member.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(["super_admin", "admin", "librarian"]),
  MemberController.createMember,
);
router.get(
  "/",
  authenticate,
  authorize(["super_admin", "admin", "librarian"]),
  MemberController.getMembers,
);
router.get("/:id", authenticate, MemberController.getMemberById);
router.put(
  "/:id",
  authenticate,
  authorize(["super_admin", "admin", "librarian"]),
  MemberController.updateMember,
);

export default router;
