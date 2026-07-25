const mocktestService = require('../services/mocktest.services');
const createMockTest = async (req, res) => {
  try {
    const mocktest = await mocktestService.createMockTest(req.body);
    res.status(201).json(mocktest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMockTests = async (req, res) => {
  try {
    const mocktests = await mocktestService.getAllMockTests();
    res.status(200).json(mocktests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMockTestsForAdmin = async (req, res) => {
  try {
    const mocktests = await mocktestService.getAllMockTestsForAdmin();
    res.status(200).json(mocktests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMockTestById = async (req, res) => {
  try {
    const mocktest = await mocktestService.getMockTestById(req.params.id);
    res.status(200).json(mocktest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMockTest = async (req, res) => {
  try {
    const mocktest = await mocktestService.updateMockTest(req.params.id, req.body);
    res.status(200).json(mocktest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMockTest = async (req, res) => {
  try {
    await mocktestService.deleteMockTest(req.params.id);
    res.status(200).json({ message: "Mock test deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const startMockTest = async (req, res) => {
  try {
    const result = await mocktestService.startMockTest(
      req.user.userId,
      req.params.id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createMockTest,
  getAllMockTests,
  getAllMockTestsForAdmin,
  getMockTestById,
  updateMockTest,
  deleteMockTest,
  startMockTest,
};
