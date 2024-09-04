/*
  Warnings:

  - You are about to drop the column `currentUseKB` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `maxUseKB` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentUseKB",
DROP COLUMN "maxUseKB",
ADD COLUMN     "currentUse" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxUse" INTEGER NOT NULL DEFAULT 10485760;
