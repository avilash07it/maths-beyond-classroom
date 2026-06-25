const supportService = require("../services/personalsupport.service");

const createSupport = async (req, res) => {
  try {
    const support = await supportService.createSupport(req.body);

    res.status(201).json({
      success: true,
      message: "Support details created successfully",
      data: support,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllSupport = async (req, res) => {
  try {
    const support = await supportService.getAllSupport();

    res.status(200).json({
      success: true,
      data: support,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSupportById = async (req, res) => {
  try {
    const support = await supportService.getSupportById(req.params.id);

    res.status(200).json({
      success: true,
      data: support,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSupport = async (req, res) => {
  try {
    const support = await supportService.updateSupport(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Support details updated successfully",
      data: support,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSupport = async (req, res) => {
  try {
    await supportService.deleteSupport(req.params.id);

    res.status(200).json({
      success: true,
      message: "Support details deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSupport,
  getAllSupport,
  getSupportById,
  updateSupport,
  deleteSupport,
};