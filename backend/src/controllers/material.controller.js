const materialService = require("../services/material.service");

const createMaterial = async (req, res) => {
  try {
    const material = await materialService.createMaterial(req.body);

    res.status(201).json({
      success: true,
      message: "Material created successfully",
      data: material,
    });
  } catch (error) {
    console.error("Create Material Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMaterials = async (req, res) => {
  try {
    const materials = await materialService.getAllMaterials({
      exam: req.query.exam,
      topic: req.query.topic,
      type: req.query.type,
    });

    res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (error) {
    console.error("Get Materials Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMaterialById = async (req, res) => {
  try {
    const material = await materialService.getMaterialById(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: "Material not found",
      });
    }

    res.status(200).json({
      success: true,
      data: material,
    });
  } catch (error) {
    console.error("Get Material By Id Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMaterial = async (req, res) => {
  try {
    const material = await materialService.updateMaterial(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Material updated successfully",
      data: material,
    });
  } catch (error) {
    console.error("Update Material Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    await materialService.deleteMaterial(req.params.id);

    res.status(200).json({
      success: true,
      message: "Material deleted successfully",
    });
  } catch (error) {
    console.error("Delete Material Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
};