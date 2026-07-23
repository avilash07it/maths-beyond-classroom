/*
  Warnings:

  - Added the required column `accent` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `features` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "accent" TEXT NOT NULL,
ADD COLUMN     "badge" TEXT,
ADD COLUMN     "bestFor" TEXT,
ADD COLUMN     "features" JSONB NOT NULL,
ADD COLUMN     "includesHeading" TEXT,
ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recommended" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PersonalSupport" (
    "id" SERIAL NOT NULL,
    "whatsappNo" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "whatsappLink" TEXT NOT NULL,
    "message" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalSupport_pkey" PRIMARY KEY ("id")
);
