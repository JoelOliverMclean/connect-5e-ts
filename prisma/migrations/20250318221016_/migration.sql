/*
  Warnings:

  - The primary key for the `CharacterSpell` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characterSpellcastingId` on the `CharacterSpell` table. All the data in the column will be lost.
  - The primary key for the `CharacterSpellcasting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CharacterSpellcasting` table. All the data in the column will be lost.
  - You are about to drop the column `maxPrepared` on the `CharacterSpellcasting` table. All the data in the column will be lost.
  - The primary key for the `SpellSlots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `characterSpellcastingId` on the `SpellSlots` table. All the data in the column will be lost.
  - You are about to drop the `CharacterProficiency` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attacksPerAction` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `burrowSpeedFt` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `climbSpeedFt` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentHitPoints` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `darkvisionBrightFt` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `darkvisionDimFt` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flySpeedFt` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxHitPoints` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remainingHitDice` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `swimSpeedFt` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempHitPoints` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walkSpeedFt` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `CharacterClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `CharacterSpell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ability` to the `CharacterSpellcasting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipped` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `SpellSlots` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AlterationType" AS ENUM ('WEAPON_PROFICIENCY', 'LANGUAGE_READ_PROFICIENCY', 'LANGUAGE_WRITE_PROFICIENCY', 'LANGUAGE_SPEAK_PROFICIENCY', 'TOOL_PROFICIENCY', 'ARMOR_PROFICIENCY', 'ARMOR_CLASS', 'SKILL_BONUS', 'SKILL_ADVANTAGE', 'SKILL_PROFICIENCY', 'ABILITY_BONUS', 'ABILITY_ADVANTAGE', 'SAVING_PROFICIENCY', 'SAVING_BONUS', 'SAVING_ADVANTAGE', 'SPEED_WALK', 'SPEED_FLY', 'SPEED_CLIMB', 'SPEED_SWIM', 'SPEED_BURROW', 'DARKVISION_DIM', 'DARKVISION_BRIGHT', 'DEATH_SAVE_ADVANTAGE', 'DEATH_SAVE_BONUS', 'DEATH_SAVE_PROFICIENCY', 'CONDITION_IMMUNITY', 'ATTUNED_ITEM_SLOTS', 'CONCENTRATION_COUNT', 'DAMAGE_RESISTANCE', 'DAMAGE_IMMUNITY', 'DAMAGE_VULNERABILITY');

-- DropForeignKey
ALTER TABLE "CharacterProficiency" DROP CONSTRAINT "CharacterProficiency_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharacterSpell" DROP CONSTRAINT "CharacterSpell_characterSpellcastingId_fkey";

-- DropForeignKey
ALTER TABLE "SpellSlots" DROP CONSTRAINT "SpellSlots_characterSpellcastingId_fkey";

-- DropIndex
DROP INDEX "CharacterSpellcasting_characterId_key";

-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "alignment" TEXT,
ADD COLUMN     "attacksPerAction" INTEGER NOT NULL,
ADD COLUMN     "background" TEXT,
ADD COLUMN     "burrowSpeedFt" INTEGER NOT NULL,
ADD COLUMN     "climbSpeedFt" INTEGER NOT NULL,
ADD COLUMN     "currentHitPoints" INTEGER NOT NULL,
ADD COLUMN     "darkvisionBrightFt" INTEGER NOT NULL,
ADD COLUMN     "darkvisionDimFt" INTEGER NOT NULL,
ADD COLUMN     "deathSaveFailures" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "deathSaveSuccesses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "deity" TEXT,
ADD COLUMN     "flySpeedFt" INTEGER NOT NULL,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "maxAttunedItems" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "maxHitPoints" INTEGER NOT NULL,
ADD COLUMN     "patron" TEXT,
ADD COLUMN     "remainingHitDice" INTEGER NOT NULL,
ADD COLUMN     "swimSpeedFt" INTEGER NOT NULL,
ADD COLUMN     "tempHitPoints" INTEGER NOT NULL,
ADD COLUMN     "walkSpeedFt" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CharacterClass" ADD COLUMN     "level" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CharacterSpell" DROP CONSTRAINT "CharacterSpell_pkey",
DROP COLUMN "characterSpellcastingId",
ADD COLUMN     "characterId" TEXT NOT NULL,
ADD CONSTRAINT "CharacterSpell_pkey" PRIMARY KEY ("characterId", "spellId");

-- AlterTable
ALTER TABLE "CharacterSpellcasting" DROP CONSTRAINT "CharacterSpellcasting_pkey",
DROP COLUMN "id",
DROP COLUMN "maxPrepared",
ADD COLUMN     "ability" "Ability" NOT NULL,
ADD COLUMN     "maxPreparedSpells" INTEGER,
ADD CONSTRAINT "CharacterSpellcasting_pkey" PRIMARY KEY ("characterId");

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "equipped" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "SpellSlots" DROP CONSTRAINT "SpellSlots_pkey",
DROP COLUMN "characterSpellcastingId",
ADD COLUMN     "characterId" TEXT NOT NULL,
ADD CONSTRAINT "SpellSlots_pkey" PRIMARY KEY ("characterId", "level");

-- DropTable
DROP TABLE "CharacterProficiency";

-- DropEnum
DROP TYPE "ProficiencySource";

-- DropEnum
DROP TYPE "ProficiencyType";

-- CreateTable
CREATE TABLE "CharacterAlteration" (
    "id" TEXT NOT NULL,
    "enhancementType" "AlterationType" NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "armorId" TEXT,
    "weaponId" TEXT,
    "raceId" TEXT,
    "subRaceId" TEXT,
    "baseClassId" TEXT,
    "subClassId" TEXT,
    "classFeatureId" TEXT,
    "itemId" TEXT,
    "conditionEffectId" TEXT,

    CONSTRAINT "CharacterAlteration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterNote" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "contents" TEXT NOT NULL,

    CONSTRAINT "CharacterNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CharacterAlteration" ADD CONSTRAINT "CharacterAlteration_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "Armor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAlteration" ADD CONSTRAINT "CharacterAlteration_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAlteration" ADD CONSTRAINT "CharacterAlteration_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAlteration" ADD CONSTRAINT "CharacterAlteration_subRaceId_fkey" FOREIGN KEY ("subRaceId") REFERENCES "SubRace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAlteration" ADD CONSTRAINT "CharacterAlteration_baseClassId_fkey" FOREIGN KEY ("baseClassId") REFERENCES "BaseClass"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAlteration" ADD CONSTRAINT "CharacterAlteration_subClassId_fkey" FOREIGN KEY ("subClassId") REFERENCES "SubClass"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAlteration" ADD CONSTRAINT "CharacterAlteration_classFeatureId_fkey" FOREIGN KEY ("classFeatureId") REFERENCES "ClassFeature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAlteration" ADD CONSTRAINT "CharacterAlteration_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterAlteration" ADD CONSTRAINT "CharacterAlteration_conditionEffectId_fkey" FOREIGN KEY ("conditionEffectId") REFERENCES "ConditionEffect"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellSlots" ADD CONSTRAINT "SpellSlots_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "CharacterSpellcasting"("characterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "CharacterSpellcasting"("characterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterNote" ADD CONSTRAINT "CharacterNote_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
