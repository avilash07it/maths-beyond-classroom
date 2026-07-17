const express = require("express");

const router = express.Router();

const pyqController = require("../controllers/pyq.controller");
const authMiddleware = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/admin.middleware");

router.post("/", authMiddleware, requireAdmin, pyqController.createPYQ);
router.get("/", pyqController.getAllPYQs);
router.get("/:id", pyqController.getPYQById);
router.put("/:id", authMiddleware, requireAdmin, pyqController.updatePYQ);
router.delete("/:id", authMiddleware, requireAdmin, pyqController.deletePYQ);

module.exports = router;
