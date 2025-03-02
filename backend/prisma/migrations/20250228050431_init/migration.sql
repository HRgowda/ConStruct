/*
  Warnings:

  - You are about to drop the `owner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "owner";

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
