const prisma = require("../configuration/prisma");

const createSupport = async (supportData) => {
  return await prisma.personalSupport.create({
    data: {
      whatsappNo: supportData.whatsappNo,
      phoneNo: supportData.phoneNo,
      whatsappLink: supportData.whatsappLink,
      message: supportData.message,
      isActive: supportData.isActive,
    },
  });
};

const getAllSupport = async () => {
  return await prisma.personalSupport.findMany();
};

const getSupportById = async (id) => {
  return await prisma.personalSupport.findUnique({
    where: {
      id: Number(id),
    },
  });
};

const updateSupport = async (id, supportData) => {
  return await prisma.personalSupport.update({
    where: {
      id: Number(id),
    },
    data: {
      whatsappNo: supportData.whatsappNo,
      phoneNo: supportData.phoneNo,
      whatsappLink: supportData.whatsappLink,
      message: supportData.message,
      isActive: supportData.isActive,
    },
  });
};

const deleteSupport = async (id) => {
  return await prisma.personalSupport.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createSupport,
  getAllSupport,
  getSupportById,
  updateSupport,
  deleteSupport,
};