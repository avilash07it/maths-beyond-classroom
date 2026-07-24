const prisma = require("../configuration/prisma"); // adjust path if needed

async function updateUserStreak(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!user.lastVisitDate) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        streak: 1,
        lastVisitDate: today,
      },
    });

    return;
  }

  const lastVisit = new Date(user.lastVisitDate);
  lastVisit.setHours(0, 0, 0, 0);

  const difference =
    (today.getTime() - lastVisit.getTime()) /
    (1000 * 60 * 60 * 24);

  if (difference === 0) {
    // Already visited today.
    return;
  }

  if (difference === 1) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        streak: user.streak + 1,
        lastVisitDate: today,
      },
    });

    return;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      streak: 1,
      lastVisitDate: today,
    },
  });
}

module.exports = updateUserStreak;