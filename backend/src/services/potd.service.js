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
        },
    });
    return potd;
};
const getAllPOTDs = async () => {
  const potds = await prisma.pOTD.findMany();

  return potds;
};

const getPOTDById = async (id) => {
  const potd = await prisma.pOTD.findUnique({
    where: {
      id: Number(id),
    },
  });

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
      status: potdData.status,
      exam: potdData.exam,
      topic: potdData.topic,
    },
  });

  return potd;
};

module.exports = {
  createPOTD,
  getAllPOTDs,
  getPOTDById,
  deletePOTD,
  updatePOTD,
};


