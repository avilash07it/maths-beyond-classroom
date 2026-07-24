require("dotenv").config();

const prisma = require("../src/configuration/prisma");

async function main() {
  // ----------------------------
  // Personal Support
  // ----------------------------
  await prisma.personalSupport.upsert({
    where: { id: 1 },
    update: {
      whatsappNo: "919876543210",
      phoneNo: "919876543210",
      whatsappLink: "https://wa.me/919876543210",
      message: "Hi! I want to know more about Maths Beyond Classroom Pro Plans.",
      isActive: true,
    },
    create: {
      id: 1,
      whatsappNo: "919876543210",
      phoneNo: "919876543210",
      whatsappLink: "https://wa.me/919876543210",
      message: "Hi! I want to know more about Maths Beyond Classroom Pro Plans.",
      isActive: true,
    },
  });

  // Remove existing plans
  await prisma.plan.deleteMany();

  // ----------------------------
  // Plans
  // ----------------------------
  await prisma.plan.createMany({
    data: [
      {
        name: "Starter Pro (SEHSS)",
        price: 499,
        description:
          "Designed for students preparing for SEHSS and school-level mathematics examinations.",
        accent: "purple",
        includesHeading: "Includes:",
        features: [
          "Curated SEHSS Test Series",
          "Additional SEHSS Study Resources",
          "Personal Academic Support",
          "Access to Premium Discussion Groups"
        ],
        bestFor:
          "Students targeting SEHSS and strengthening school mathematics foundations.",
        badge: null,
        recommended: false,
        premium: false,
        isActive: true,
      },
      {
        name: "Starter Pro (IOQM)",
        price: 499,
        description:
          "Built for students beginning their Olympiad journey through IOQM preparation.",
        accent: "blue",
        includesHeading: "Includes:",
        features: [
          "Curated IOQM Test Series",
          "Additional IOQM Study Resources",
          "Personal Academic Support",
          "Access to Premium Discussion Groups"
        ],
        bestFor: "Students preparing specifically for IOQM.",
        badge: null,
        recommended: false,
        premium: false,
        isActive: true,
      },
      {
        name: "Pro Plus",
        price: 799,
        description:
          "The complete preparation package for students aiming at both SEHSS and IOQM.",
        accent: "purple",
        includesHeading: "Includes Everything in Both Starter Plans:",
        features: [
          "Curated SEHSS Test Series",
          "Curated IOQM Test Series",
          "Additional Content for SEHSS & IOQM",
          "Personal Academic Support",
          "Access to Premium Discussion Groups"
        ],
        bestFor:
          "Students simultaneously preparing for school examinations and Olympiad mathematics.",
        badge: "Most Popular",
        recommended: true,
        premium: false,
        isActive: true,
      },
      {
        name: "Pro Max",
        price: 1299,
        description:
          "The ultimate mathematics preparation experience for serious Olympiad aspirants.",
        accent: "gold",
        includesHeading: "Includes Everything in Pro Plus, along with:",
        features: [
          "Daily Expert Solution Review & Feedback",
          "Fast and Prioritized Doubt Resolution",
          "Access to Model Expert Solutions for POTD",
          "Advanced Problem-Solving Approaches and Shortcuts",
          "Detailed Performance Analytics",
          "AI-Powered Learning Features",
          "Extended Support for Higher Olympiad Levels (RMO and Beyond)"
        ],
        bestFor:
          "Students aiming for top ranks in IOQM, RMO, and advanced mathematics competitions.",
        badge: "Premium",
        recommended: false,
        premium: true,
        isActive: true,
      },
    ],
  });

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });