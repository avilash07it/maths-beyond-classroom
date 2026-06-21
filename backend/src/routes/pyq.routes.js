const express = require("express");

const router = express.Router();

const pyqController = require("../controllers/pyq.controller");

router.post("/", pyqController.createPYQ);
router.get("/", pyqController.getAllPYQs);
router.get("/:id", pyqController.getPYQById);
router.put("/:id", pyqController.updatePYQ);
router.delete("/:id", pyqController.deletePYQ);

module.exports = router;