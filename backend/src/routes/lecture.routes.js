const express = require("express");

const router = express.Router();

const lectureController = require("../controllers/lecture.controller");
const authMiddleware = require("../middleware/auth.middleware");
const requireAdmin = require("../middleware/admin.middleware");

 router.post(
 "/",
  authMiddleware,
  requireAdmin,
  lectureController.createLecture
 );

router.get("/", lectureController.getAllLectures);

router.get("/:id", lectureController.getLectureById);

router.put(
  "/:id",
  authMiddleware,
  requireAdmin,
  lectureController.updateLecture
);

router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  lectureController.deleteLecture
);

module.exports = router;