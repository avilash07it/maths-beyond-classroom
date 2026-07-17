const paymentService = require("../services/payment.service");

const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPayment(
      req.user.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Payment request created successfully",
      data: payment,
    });
  } catch (error) {
    console.error("Create Payment Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();

    res.status(200).json({
      success: true,
      count: payments.length,
      message: "Payment requests retrieved successfully",
      data: payments,
    });
  } catch (error) {
    console.error("Get Payments Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approvePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await paymentService.approvePayment(id);

    res.status(200).json({
      success: true,
      message: "Payment approved successfully",
      data: payment,
    });
  } catch (error) {
    console.error("Approve Payment Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await paymentService.rejectPayment(id, req.body);

    res.status(200).json({
      success: true,
      message: "Payment rejected successfully",
      data: payment,
    });
  } catch (error) {
    console.error("Reject Payment Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  approvePayment,
  rejectPayment,
};
