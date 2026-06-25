const planService = require("../services/plan.service");

const createPlan = async (req, res) => {
  try {
    const plan = await planService.createPlan(req.body);

    res.status(201).json({
      success: true,
      message: "Plan created successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Create Plan Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPlans = async (req, res) => {
  try {
    const plans = await planService.getAllPlans();

    res.status(200).json({
      success: true,
      count: plans.length,
      message: "Plans retrieved successfully",
      data: plans,
    });
  } catch (error) {
    console.error("Get Plans Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await planService.getPlanById(id);

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error("Get Plan Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await planService.updatePlan(id, req.body);

    res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Update Plan Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await planService.deletePlan(id);

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Delete Plan Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};