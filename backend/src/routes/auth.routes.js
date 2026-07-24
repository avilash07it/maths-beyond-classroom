const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const authController = require("../controllers/auth.controller");
const { getMe } = require("../controllers/auth.controller");

router.get("/me", authMiddleware, getMe);
router.post("/register", authController.register);
router.post("/login", authController.login);
module.exports = router;