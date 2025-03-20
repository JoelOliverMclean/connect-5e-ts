/*
  Warnings:

  - Added the required column `schoolId` to the `Spell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spell" ADD COLUMN     "schoolId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MagicSchool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "MagicSchool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MagicSchool_sourceId_slug_key" ON "MagicSchool"("sourceId", "slug");

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "MagicSchool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MagicSchool" ADD CONSTRAINT "MagicSchool_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
