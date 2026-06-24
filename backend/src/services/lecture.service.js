const prisma = require("../configuration/prisma");

const createLecture = async (lectureData) => {
  const lecture = await prisma.lecture.create({
    data: {
      title: lectureData.title,
      lectureNumber: lectureData.lectureNumber,
      youtubeUrl: lectureData.youtubeUrl,
      exam: lectureData.exam,
      topic: lectureData.topic,
      isRecorded: lectureData.isRecorded,
    },
  });

  return lecture;
};

const getAllLectures = async (filters) => {
  const lectures = await prisma.lecture.findMany({
    where: {
      ...(filters.exam && { exam: filters.exam }),
      ...(filters.topic && { topic: filters.topic }),
    },
  });

  return lectures;
};

const getLectureById = async (id) => {
  const lecture = await prisma.lecture.findUnique({
    where: {
      id: Number(id),
    },
  });

  return lecture;
};

const updateLecture = async (id, lectureData) => {
  const lecture = await prisma.lecture.update({
    where: {
      id: Number(id),
    },
    data: {
      title: lectureData.title,
      lectureNumber: lectureData.lectureNumber,
      youtubeUrl: lectureData.youtubeUrl,
      exam: lectureData.exam,
      topic: lectureData.topic,
      isRecorded: lectureData.isRecorded,
    },
  });

  return lecture;
};

const deleteLecture = async (id) => {
  const lecture = await prisma.lecture.delete({
    where: {
      id: Number(id),
    },
  });

  return lecture;
};

module.exports = {
  createLecture,
  getAllLectures,
  getLectureById,
  updateLecture,
  deleteLecture,
};