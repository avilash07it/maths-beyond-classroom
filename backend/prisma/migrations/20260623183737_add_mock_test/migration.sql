/*
  Warnings:

  - Added the required column `duration` to the `MockTest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MockTest" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "marks" INTEGER,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "questions" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Draft';
