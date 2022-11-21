-- CreateTable
CREATE TABLE "SessionExercise" (
    "id" TEXT NOT NULL,
    "burnedCalories" INTEGER NOT NULL,
    "timeInMinutes" INTEGER NOT NULL,
    "trainingSessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingSession" (
    "id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionExercise" ADD CONSTRAINT "SessionExercise_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingSession" ADD CONSTRAINT "TrainingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
