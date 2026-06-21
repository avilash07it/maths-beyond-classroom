const pyqService = require("../services/pyq.service");

const createPYQ = async (req, res) => {
  try {
    const pyq = await pyqService.createPYQ(req.body);

    res.status(201).json({
      success: true,
      message: "PYQ created successfully",
      data: pyq,
    });
  } catch (error) {
    console.error("Create PYQ Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllPYQs = async (req, res) => {
  try {
    const pyqs = await pyqService.getAllPYQs();

    res.status(200).json({
      success: true,
      count: pyqs.length,
      data: pyqs,
    });
  } catch (error) {
    console.error("Get PYQs Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPYQ,
  getAllPYQs,
};