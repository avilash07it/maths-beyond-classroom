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
    const pyqs = await pyqService.getAllPYQs({
      exam: req.query.exam,
      topic: req.query.topic,
    });

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
const getPYQById = async (req, res) => {
  try {
    const pyq = await pyqService.getPYQById(req.params.id);

    if (!pyq) {
      return res.status(404).json({
        success: false,
        message: "PYQ not found",
      });
    }

    res.status(200).json({
      success: true,
      data: pyq,
    });
  } catch (error) {
    console.error("Get PYQ By Id Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updatePYQ = async (req, res) => {
  try {
    const pyq = await pyqService.updatePYQ(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "PYQ updated successfully",
      data: pyq,
    });
  } catch (error) {
    console.error("Update PYQ Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePYQ = async (req, res) => {
  try {
    await pyqService.deletePYQ(req.params.id);

    res.status(200).json({
      success: true,
      message: "PYQ deleted successfully",
    });
  } catch (error) {
    console.error("Delete PYQ Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createPYQ,
  getAllPYQs,
  getPYQById,
  updatePYQ,
  deletePYQ,
};
