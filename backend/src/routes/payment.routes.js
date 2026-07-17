const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/admin.middleware");
const paymentController = require("../controllers/payment.controller");

router.post("/", authMiddleware, paymentController.createPayment);

router.get("/", authMiddleware, requireAdmin, paymentController.getAllPayments);

router.patch(
  "/:id/approve",
  authMiddleware,
  requireAdmin,
  paymentController.approvePayment
);

router.patch(
  "/:id/reject",
  authMiddleware,
  requireAdmin,
  paymentController.rejectPayment
);

module.exports = router;
