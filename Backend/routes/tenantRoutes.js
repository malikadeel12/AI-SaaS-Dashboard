import { Router } from "express";
import { createTenant, listTenants, createTenantAdmin } from "../controllers/tenantController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { requireRoles } from "../middleware/roleMiddleware.js";

const router = Router();


router.post("/", authenticate, requireRoles("SuperAdmin"), createTenant);
router.get("/", authenticate, requireRoles("SuperAdmin"), listTenants);
router.post("/:tenantId/admin", authenticate, requireRoles("SuperAdmin"), createTenantAdmin);

export default router;
