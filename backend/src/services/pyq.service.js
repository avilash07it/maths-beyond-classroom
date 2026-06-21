const prisma = require("../configuration/prisma");

const createPYQ = async (pyqData) => {
  const pyq = await prisma.pYQ.create({
    data: {
      title: pyqData.title,
      pdfUrl: pyqData.pdfUrl,
      exam: pyqData.exam,
      topic: pyqData.topic,
      year: pyqData.year,
    },
  });

  return pyq;
};
const getAllPYQs = async () => {
  const pyqs = await prisma.pYQ.findMany();

  return pyqs;
};
const getPYQById = async (id) => {
  const pyq = await prisma.pYQ.findUnique({
    where: {
      id: Number(id),
    },
  });

  return pyq;
};
const updatePYQ = async (id, pyqData) => {
  const pyq = await prisma.pYQ.update({
    where: {
      id: Number(id),
    },
    data: {
      title: pyqData.title,
      pdfUrl: pyqData.pdfUrl,
      exam: pyqData.exam,
      topic: pyqData.topic,
      year: pyqData.year,
    },
  });

  return pyq;
};
const deletePYQ = async (id) => {
  const pyq = await prisma.pYQ.delete({
    where: {
      id: Number(id),
    },
  });

  return pyq;
};
module.exports = {
  createPYQ,
  getAllPYQs,
  getPYQById,
  updatePYQ,
  deletePYQ,
};

