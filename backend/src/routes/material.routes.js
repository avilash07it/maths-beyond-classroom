const express = require("express");

const router = express.Router();

const materialController = require("../controllers/material.controller");
// const authMiddleware = require("../middleware/auth.middleware");
// const requireAdmin = require("../middleware/admin.middleware");

router.post(
  "/",
  // authMiddleware,
  // requireAdmin,
  materialController.createMaterial
);

router.get("/", materialController.getAllMaterials);

router.get("/:id", materialController.getMaterialById);

router.put(
  "/:id",
  // authMiddleware,
  // requireAdmin,
  materialController.updateMaterial
);

router.delete(
  "/:id",
  // authMiddleware,
  // requireAdmin,
  materialController.deleteMaterial
);

module.exports = router;