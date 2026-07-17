const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/admin.middleware");
const supportController = require("../controllers/personalsupport.controller");

router.post("/", authMiddleware, requireAdmin, supportController.createSupport);

router.get("/", supportController.getAllSupport);

router.get("/:id", supportController.getSupportById);

router.put("/:id", authMiddleware, requireAdmin, supportController.updateSupport);

router.delete("/:id", authMiddleware, requireAdmin, supportController.deleteSupport);

module.exports = router;
