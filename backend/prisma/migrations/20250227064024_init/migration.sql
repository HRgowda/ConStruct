-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "motion" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gps" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pulseRate" DOUBLE PRECISION NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "owner_email_key" ON "owner"("email");
