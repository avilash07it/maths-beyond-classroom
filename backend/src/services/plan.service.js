const prisma = require("../configuration/prisma");

const createPlan = async (planData) => {
  return await prisma.plan.create({
    data: {
      name: planData.name,
      price: planData.price,
      description: planData.description,
      accent: planData.accent,
      includesHeading: planData.includesHeading,
      features: planData.features,
      bestFor: planData.bestFor,
      badge: planData.badge,
      recommended: planData.recommended,
      premium: planData.premium,
      isActive: planData.isActive,
    },
  });
};

const getAllPlans = async () => {
  return await prisma.plan.findMany();
};

const getPlanById = async (id) => {
  return await prisma.plan.findUnique({
    where: {
      id: Number(id),
    },
  });
};

const updatePlan = async (id, planData) => {
  return await prisma.plan.update({
    where: {
      id: Number(id),
    },
    data: {
      name: planData.name,
      price: planData.price,
      description: planData.description,
      accent: planData.accent,
      includesHeading: planData.includesHeading,
      features: planData.features,
      bestFor: planData.bestFor,
      badge: planData.badge,
      recommended: planData.recommended,
      premium: planData.premium,
      isActive: planData.isActive,
    },
  });
};

const deletePlan = async (id) => {
  return await prisma.plan.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};