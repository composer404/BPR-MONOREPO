/*
  Warnings:

  - Added the required column `estimatedTimeInMinutes` to the `SessionExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exercise_type` to the `SessionExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscle_group` to the `SessionExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `SessionExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionExercise" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "estimatedTimeInMinutes" INTEGER NOT NULL,
ADD COLUMN     "exercise_type" TEXT NOT NULL,
ADD COLUMN     "muscle_group" TEXT NOT NULL,
ADD COLUMN     "quantity" DOUBLE PRECISION,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "trainingMachineId" TEXT,
ALTER COLUMN "burnedCalories" SET DEFAULT 0,
ALTER COLUMN "timeInMinutes" SET DEFAULT 0;
