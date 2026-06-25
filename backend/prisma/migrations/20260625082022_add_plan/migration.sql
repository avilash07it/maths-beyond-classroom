/*
  Warnings:

  - You are about to drop the column `date` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `lectureType` on the `Lecture` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Lecture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "date",
DROP COLUMN "lectureType",
DROP COLUMN "status";
