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

module.exports = {
  createPYQ,
};