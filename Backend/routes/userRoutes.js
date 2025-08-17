import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { requireRoles } from "../middleware/roleMiddleware.js";
import { createUser, listUsers, updateUserRole } from "../controllers/userController.js";
import { getTeam } from "../controllers/userController.js";

const router = Router();

router.post("/", authenticate, requireRoles("SuperAdmin", "Admin"), createUser);
router.get("/", authenticate, requireRoles("SuperAdmin", "Admin", "Manager"), listUsers);
router.patch("/:id/role", authenticate, requireRoles("SuperAdmin", "Admin"), updateUserRole);
router.get("/team",authenticate, requireRoles("Manager"), getTeam);
export default router;
