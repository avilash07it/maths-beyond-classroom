-- AlterTable
ALTER TABLE "Lecture" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "lectureType" TEXT NOT NULL DEFAULT 'Live',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Upcoming';
