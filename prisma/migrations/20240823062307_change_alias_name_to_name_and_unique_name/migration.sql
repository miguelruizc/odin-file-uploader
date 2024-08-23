/*
  Warnings:

  - You are about to drop the column `alias` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueName]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "File_name_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "alias",
ADD COLUMN     "uniqueName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_uniqueName_key" ON "File"("uniqueName");
