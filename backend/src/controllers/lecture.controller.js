const lectureService = require("../services/lecture.service");

const createLecture = async (req, res) => {
  try {
    const lecture = await lectureService.createLecture(req.body);

    res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      data: lecture,
    });
  } catch (error) {
    console.error("Create Lecture Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllLectures = async (req, res) => {
  try {
    const lectures = await lectureService.getAllLectures({
      exam: req.query.exam,
      topic: req.query.topic,
    });

    res.status(200).json({
      success: true,
      count: lectures.length,
      data: lectures,
    });
  } catch (error) {
    console.error("Get Lectures Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLectureById = async (req, res) => {
  try {
    const lecture = await lectureService.getLectureById(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lecture,
    });
  } catch (error) {
    console.error("Get Lecture By Id Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateLecture = async (req, res) => {
  try {
    const lecture = await lectureService.updateLecture(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      data: lecture,
    });
  } catch (error) {
    console.error("Update Lecture Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteLecture = async (req, res) => {
  try {
    await lectureService.deleteLecture(req.params.id);

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    console.error("Delete Lecture Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createLecture,
  getAllLectures,
  getLectureById,
  updateLecture,
  deleteLecture,
};