const prisma = require("../configuration/prisma");

const createPayment = async (userId, paymentData) => {
  const plan = await prisma.plan.findUnique({
    where: {
      id: paymentData.planId,
    },
  });

  if (!plan) {
    throw new Error("Plan not found");
  }

  const pendingPayment = await prisma.payment.findFirst({
    where: {
      userId: Number(userId),
      planId: paymentData.planId,
      status: "PENDING",
    },
  });

  if (pendingPayment) {
    throw new Error("Pending payment request already exists for this plan");
  }

  return await prisma.payment.create({
    data: {
      userId: Number(userId),
      planId: paymentData.planId,
      amount: paymentData.amount,
      transactionId: paymentData.transactionId,
      screenshotUrl: paymentData.screenshotUrl,
      status: "PENDING",
    },
  });
};

const getAllPayments = async () => {
  return await prisma.payment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      plan: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });
};

const approvePayment = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const existingPayment = await tx.payment.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingPayment) {
      throw new Error("Payment not found");
    }

    if (existingPayment.status !== "PENDING") {
      throw new Error("Only pending payments can be approved");
    }

    const payment = await tx.payment.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "APPROVED",
      },
    });

    await tx.user.update({
      where: {
        id: payment.userId,
      },
      data: {
        isPro: true,
      },
    });

    return payment;
  });
};

const rejectPayment = async (id, paymentData) => {
  const existingPayment = await prisma.payment.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!existingPayment) {
    throw new Error("Payment not found");
  }

  if (existingPayment.status !== "PENDING") {
    throw new Error("Only pending payments can be rejected");
  }

  return await prisma.payment.update({
    where: {
      id: Number(id),
    },
    data: {
      status: "REJECTED",
      adminNote: paymentData.adminNote,
    },
  });
};

module.exports = {
  createPayment,
  getAllPayments,
  approvePayment,
  rejectPayment,
};
