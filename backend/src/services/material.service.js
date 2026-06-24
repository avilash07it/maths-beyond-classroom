const prisma = require("../configuration/prisma");

const createMaterial = async (materialData) => {
  const material = await prisma.material.create({
    data: {
      title: materialData.title,
      pdfUrl: materialData.pdfUrl,
      exam: materialData.exam,
      topic: materialData.topic,
      type: materialData.type,
    },
  });

  return material;
};

const getAllMaterials = async (filters) => {
  const materials = await prisma.material.findMany({
    where: {
      ...(filters.exam && { exam: filters.exam }),
      ...(filters.topic && { topic: filters.topic }),
      ...(filters.type && { type: filters.type }),
    },
  });

  return materials;
};

const getMaterialById = async (id) => {
  const material = await prisma.material.findUnique({
    where: {
      id: Number(id),
    },
  });

  return material;
};

const updateMaterial = async (id, materialData) => {
  const material = await prisma.material.update({
    where: {
      id: Number(id),
    },
    data: {
      title: materialData.title,
      pdfUrl: materialData.pdfUrl,
      exam: materialData.exam,
      topic: materialData.topic,
      type: materialData.type,
    },
  });

  return material;
};

const deleteMaterial = async (id) => {
  const material = await prisma.material.delete({
    where: {
      id: Number(id),
    },
  });

  return material;
};

module.exports = {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
};