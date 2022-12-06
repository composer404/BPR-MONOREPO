/*
  Warnings:

  - You are about to drop the column `formula_for_calories` on the `TrainingMachine` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `TrainingMachine` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `TrainingType` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "TrainingMachine" DROP COLUMN "formula_for_calories",
DROP COLUMN "video";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar";

-- DropTable
DROP TABLE "TrainingType";

-- CreateTable
CREATE TABLE "ExerciseType" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseType_pkey" PRIMARY KEY ("id")
);
