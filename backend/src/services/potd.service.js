const prisma=require("../configuration/prisma");

const createPOTD=async(potdData) =>{
    return await prisma.pOTD.create({
        data: {
title: potdData.title,
problemImageUrl: potdData.problemImageUrl,
solutionImageUrl: potdData.solutionImageUrl,
status: potdData.status,
exam: potdData.exam,
topic: potdData.topic,
hintImageUrl: potdData.hintImageUrl,
        },
    });
    return potd;
};
const getAllPOTDs = async () => {
  const potds = await prisma.pOTD.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      problemImageUrl: true,
      hintImageUrl: true,
      exam: true,
      topic: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return potds;
};

const getAllPOTDsForAdmin = async () => {
  const potds = await prisma.pOTD.findMany();

  return potds;
};

const getPOTDById = async (id) => {
  const potd = await prisma.pOTD.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      title: true,
      problemImageUrl: true,
      hintImageUrl: true,
      exam: true,
      topic: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (potd?.status !== "Published") {
    return null;
  }

  return potd;
};

const deletePOTD = async (id) => {
  const potd = await prisma.pOTD.delete({
    where: {
      id: Number(id),
    },
  });

  return potd;
};

const updatePOTD = async (id, potdData) => {
  const potd = await prisma.pOTD.update({
    where: {
      id: Number(id),
    },
    data: {
      title: potdData.title,
      problemImageUrl: potdData.problemImageUrl,
      solutionImageUrl: potdData.solutionImageUrl,
      hintImageUrl: potdData.hintImageUrl,
      status: potdData.status,
      exam: potdData.exam,
      topic: potdData.topic,
    },
  });

  return potd;
};
const getTodayPOTD = async () => {
  return await prisma.pOTD.findFirst({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      problemImageUrl: true,
      hintImageUrl: true,
      exam: true,
      topic: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
const getHint = async (id) => {
  return await prisma.pOTD.findFirst({
    where: {
      id: Number(id),
      status: "Published",
    },
    select: {
      hintImageUrl: true,
    },
  });
};
const getSolution = async (userId, id) => {
  const approvedPayment = await prisma.payment.findFirst({
    where: {
      userId: Number(userId),
      status: "APPROVED",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!approvedPayment) {
    const error = new Error("Pro access required");
    error.statusCode = 403;
    throw error;
  }

  return await prisma.pOTD.findFirst({
    where: {
      id: Number(id),
      status: "Published",
    },
    select: {
      solutionImageUrl: true,
    },
  });
};

module.exports = {
  createPOTD,
  getAllPOTDs,
  getAllPOTDsForAdmin,
  getPOTDById,
  deletePOTD,
  updatePOTD,
  getTodayPOTD,
  getHint,
    getSolution,
};


