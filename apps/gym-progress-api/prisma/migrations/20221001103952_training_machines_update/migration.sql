/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `TrainingMachine` table. All the data in the column will be lost.
  - Added the required column `trainingMachineId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TrainingMachine" DROP CONSTRAINT "TrainingMachine_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "trainingMachineId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrainingMachine" DROP COLUMN "exerciseId";

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_trainingMachineId_fkey" FOREIGN KEY ("trainingMachineId") REFERENCES "TrainingMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
