const prisma = require("../configuration/prisma");

const createMockTest = async (mockTestData) => {
  return await prisma.mockTest.create({
    data: {
      title: mockTestData.title,
      exam: mockTestData.exam,
      topic: mockTestData.topic,
      externalUrl: mockTestData.externalUrl,
      isProOnly: mockTestData.isProOnly,
      platform: mockTestData.platform,
      duration: mockTestData.duration,
      questions: mockTestData.questions,
      marks: mockTestData.marks,
      status: mockTestData.status,
    },
  });
};

const getAllMockTests = async () => {
  return await prisma.mockTest.findMany();
};

const getMockTestById = async (id) => {
  return await prisma.mockTest.findUnique({
    where: {
      id: Number(id),
    },
  });
};

const updateMockTest = async (id, mockTestData) => {
  return await prisma.mockTest.update({
    where: {
      id: Number(id),
    },
    data: {
      title: mockTestData.title,
      exam: mockTestData.exam,
      topic: mockTestData.topic,
      externalUrl: mockTestData.externalUrl,
      isProOnly: mockTestData.isProOnly,
      platform: mockTestData.platform,
      duration: mockTestData.duration,
      questions: mockTestData.questions,
      marks: mockTestData.marks,
      status: mockTestData.status,
    },
  });
};

const deleteMockTest = async (id) => {
  return await prisma.mockTest.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createMockTest,
  getAllMockTests,
  getMockTestById,
  updateMockTest,
  deleteMockTest,
};