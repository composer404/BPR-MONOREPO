-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_trainingMachineId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "trainingMachineId" DROP NOT NULL;
