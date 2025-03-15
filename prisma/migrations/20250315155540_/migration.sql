/*
  Warnings:

  - The primary key for the `WeaponDamage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WeaponDamage` table. All the data in the column will be lost.
  - You are about to drop the `Languages` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `Ammunition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `Armor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `BaseClass` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `ClassFeature` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `Condition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `Material` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `Race` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `RaceFeature` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `Spell` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `SubClass` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `SubRace` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `Weapon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sourceId,slug]` on the table `WeaponProperty` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceId` to the `Ammunition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `Armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `BaseClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `ClassFeature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `Condition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `Race` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `RaceFeature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `Spell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `SubClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `SubRace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `Weapon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `WeaponPropertiesOnWeapon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceId` to the `WeaponProperty` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ammunition_slug_key";

-- DropIndex
DROP INDEX "BaseClass_name_key";

-- DropIndex
DROP INDEX "BaseClass_slug_key";

-- DropIndex
DROP INDEX "ClassFeature_slug_key";

-- DropIndex
DROP INDEX "Item_slug_key";

-- DropIndex
DROP INDEX "Race_slug_key";

-- DropIndex
DROP INDEX "RaceFeature_slug_key";

-- DropIndex
DROP INDEX "SubClass_name_key";

-- DropIndex
DROP INDEX "SubClass_slug_key";

-- DropIndex
DROP INDEX "SubRace_slug_key";

-- DropIndex
DROP INDEX "Weapon_slug_key";

-- DropIndex
DROP INDEX "WeaponProperty_slug_key";

-- AlterTable
ALTER TABLE "Ammunition" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Armor" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BaseClass" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClassFeature" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Condition" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Currency" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "inventoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Material" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Race" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RaceFeature" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Spell" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubClass" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubRace" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Weapon" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WeaponDamage" DROP CONSTRAINT "WeaponDamage_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "WeaponDamage_pkey" PRIMARY KEY ("weaponId", "type");

-- AlterTable
ALTER TABLE "WeaponPropertiesOnWeapon" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WeaponProperty" ADD COLUMN     "sourceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Languages";

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerProfileId" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_slug_key" ON "Source"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Language_slug_key" ON "Language"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Language_sourceId_slug_key" ON "Language"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Ammunition_sourceId_slug_key" ON "Ammunition"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_sourceId_slug_key" ON "Armor"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "BaseClass_sourceId_slug_key" ON "BaseClass"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "ClassFeature_sourceId_slug_key" ON "ClassFeature"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Condition_sourceId_slug_key" ON "Condition"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_sourceId_slug_key" ON "Currency"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Item_sourceId_slug_key" ON "Item"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Material_sourceId_slug_key" ON "Material"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Race_sourceId_slug_key" ON "Race"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "RaceFeature_sourceId_slug_key" ON "RaceFeature"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_sourceId_slug_key" ON "Spell"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "SubClass_sourceId_slug_key" ON "SubClass"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "SubRace_sourceId_slug_key" ON "SubRace"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_sourceId_slug_key" ON "Weapon"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponProperty_sourceId_slug_key" ON "WeaponProperty"("sourceId", "slug");

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_ownerProfileId_fkey" FOREIGN KEY ("ownerProfileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubRace" ADD CONSTRAINT "SubRace_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseClass" ADD CONSTRAINT "BaseClass_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubClass" ADD CONSTRAINT "SubClass_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ammunition" ADD CONSTRAINT "Ammunition_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponProperty" ADD CONSTRAINT "WeaponProperty_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
