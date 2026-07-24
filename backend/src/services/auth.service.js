const prisma = require("../configuration/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const updateUserStreak = require("./updateUserStreak");

const registerUser = async (userData) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    10
  );

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isPro: user.isPro,
  };
};

const loginUser = async (loginData) => {
  const user = await prisma.user.findUnique({
    where: {
      email: loginData.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  await updateUserStreak(user.id);
  const updatedUser = await prisma.user.findUnique({
  where: {
    id: user.id,
  },
});

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
      isPro: user.isPro,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
   user: {
  id: updatedUser.id,
  name: updatedUser.name,
  email: updatedUser.email,
  role: updatedUser.role,
  isPro: updatedUser.isPro,
  streak: updatedUser.streak,
},
  };
};

module.exports = {
  registerUser,
  loginUser,
};