const express = require("express");

const router = express.Router();

const pyqController = require("../controllers/pyq.controller");

router.post("/", pyqController.createPYQ);
router.get("/", pyqController.getAllPYQs);

module.exports = router;