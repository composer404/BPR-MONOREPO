/*
  Warnings:

  - Added the required column `class` to the `TrainingMachine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingMachine" ADD COLUMN     "class" TEXT NOT NULL;
