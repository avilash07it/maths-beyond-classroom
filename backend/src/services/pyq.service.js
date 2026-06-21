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

module.exports = {
  createPYQ,
  getAllPYQs,
};