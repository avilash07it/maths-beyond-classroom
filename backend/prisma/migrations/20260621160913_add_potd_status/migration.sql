/*
  Warnings:

  - Added the required column `status` to the `POTD` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "POTD" ADD COLUMN     "status" TEXT NOT NULL;
