-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastVisitDate" TIMESTAMP(3),
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;
