/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "motion" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gps" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pulseRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_name_key" ON "Worker"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_ownerId_key" ON "Worker"("ownerId");

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
