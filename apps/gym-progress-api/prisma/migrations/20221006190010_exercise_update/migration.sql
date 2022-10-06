/*
  Warnings:

  - You are about to drop the column `training_type` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `exercise_type` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "training_type",
ADD COLUMN     "exercise_type" TEXT NOT NULL;
