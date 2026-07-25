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
  return await prisma.mockTest.findMany({
    select: {
      id: true,
      title: true,
      exam: true,
      topic: true,
      platform: true,
      duration: true,
      marks: true,
      questions: true,
      status: true,
      isProOnly: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getAllMockTestsForAdmin = async () => {
  return await prisma.mockTest.findMany();
};

const getMockTestById = async (id) => {
  return await prisma.mockTest.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      title: true,
      exam: true,
      topic: true,
      platform: true,
      duration: true,
      marks: true,
      questions: true,
      status: true,
      isProOnly: true,
      createdAt: true,
      updatedAt: true,
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

const startMockTest = async (userId, mockTestId) => {
  // Find the mock test
  const mockTest = await prisma.mockTest.findUnique({
    where: {
      id: Number(mockTestId),
    },
  });

  if (!mockTest) {
    throw new Error("Mock test not found.");
  }

  // Free mock test → allow immediately
  if (!mockTest.isProOnly) {
    return {
      externalUrl: mockTest.externalUrl,
    };
  }

  // Find the latest approved payment
  const approvedPayment = await prisma.payment.findFirst({
    where: {
      userId,
      status: "APPROVED",
    },
    include: {
      plan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!approvedPayment) {
    throw new Error("Upgrade your plan to access this mock test.");
  }

  const planName = approvedPayment.plan.name;

  const exam = mockTest.exam;

const allowed =
  planName === "Pro Max" ||

  (planName === "Pro Plus" &&
    (exam === "IOQM" || exam === "SEHSS")) ||

  (planName === "Starter Pro (IOQM)" &&
    exam === "IOQM") ||

  (planName === "Starter Pro (SEHSS)" &&
    exam === "SEHSS");

  if (!allowed) {
    throw new Error("Upgrade your plan to access this mock test.");
  }

  return {
    externalUrl: mockTest.externalUrl,
  };
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
