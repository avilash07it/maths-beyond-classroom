const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/admin.middleware");
const planController = require("../controllers/plan.controller");

router.post("/", authMiddleware, requireAdmin, planController.createPlan);

router.get("/", planController.getAllPlans);

router.get("/:id", planController.getPlanById);

router.put("/:id", authMiddleware, requireAdmin, planController.updatePlan);

router.delete("/:id", authMiddleware, requireAdmin, planController.deletePlan);

module.exports = router;
