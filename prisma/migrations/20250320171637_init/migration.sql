-- CreateEnum
CREATE TYPE "RefreshPeriod" AS ENUM ('SHORT_REST', 'LONG_REST', 'AT_DAWN');

-- CreateEnum
CREATE TYPE "FeatureType" AS ENUM ('FEATURE', 'ACTION', 'BONUS_ACTION', 'REACTION');

-- CreateEnum
CREATE TYPE "InventoryType" AS ENUM ('BACKPACK', 'STORAGE');

-- CreateEnum
CREATE TYPE "InventoryItemType" AS ENUM ('ITEM', 'WEAPON', 'ARMOR', 'TOOL', 'AMMUNITION', 'TRINKET');

-- CreateEnum
CREATE TYPE "WeaponType" AS ENUM ('MELEE', 'RANGED');

-- CreateEnum
CREATE TYPE "DamageType" AS ENUM ('ACID', 'BLUDGEONING', 'COLD', 'FIRE', 'FORCE', 'LIGHTNING', 'NECROTIC', 'PIERCING', 'POISON', 'PSYCHIC', 'RADIANT', 'SLASHING', 'THUNDER');

-- CreateEnum
CREATE TYPE "ArmorType" AS ENUM ('LIGHT', 'MEDIUM', 'HEAVY', 'SHIELD');

-- CreateEnum
CREATE TYPE "AlterationType" AS ENUM ('WEAPON_PROFICIENCY', 'LANGUAGE_READ_PROFICIENCY', 'LANGUAGE_WRITE_PROFICIENCY', 'LANGUAGE_SPEAK_PROFICIENCY', 'TOOL_PROFICIENCY', 'ARMOR_PROFICIENCY', 'ARMOR_CLASS', 'SKILL_BONUS', 'SKILL_ADVANTAGE', 'SKILL_PROFICIENCY', 'ABILITY_BONUS', 'ABILITY_ADVANTAGE', 'SAVING_PROFICIENCY', 'SAVING_BONUS', 'SAVING_ADVANTAGE', 'SPEED_WALK', 'SPEED_FLY', 'SPEED_CLIMB', 'SPEED_SWIM', 'SPEED_BURROW', 'DARKVISION_DIM', 'DARKVISION_BRIGHT', 'DEATH_SAVE_ADVANTAGE', 'DEATH_SAVE_BONUS', 'DEATH_SAVE_PROFICIENCY', 'CONDITION_IMMUNITY', 'ATTUNED_ITEM_SLOTS', 'CONCENTRATION_COUNT', 'DAMAGE_RESISTANCE', 'DAMAGE_IMMUNITY', 'DAMAGE_VULNERABILITY');

-- CreateEnum
CREATE TYPE "Ability" AS ENUM ('STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'INTELLIGENCE', 'WISDOM', 'CHARISMA');

-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('ACROBATICS', 'ANIMAL_HANDLING', 'ARCANA', 'ATHLETICS', 'DECEPTION', 'HISTORY', 'INSIGHT', 'INTIMIDATION', 'INVESTIGATION', 'MEDICINE', 'NATURE', 'PERCEPTION', 'PERFORMANCE', 'PERSUASION', 'RELIGION', 'SLEIGHT_OF_HAND', 'STEALTH', 'SURVIVAL');

-- CreateEnum
CREATE TYPE "ProficiencyType" AS ENUM ('WEAPON', 'ARMOR', 'LANGUAGE_READ', 'LANGUAGE_WRITE', 'LANGUAGE_SPEAK', 'TOOL', 'SAVING_THROWS');

-- CreateEnum
CREATE TYPE "ProficiencySource" AS ENUM ('CLASS', 'SUB_CLASS', 'RACE', 'SUB_RACE');

-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('ITEM');

-- CreateEnum
CREATE TYPE "MagicItemType" AS ENUM ('ITEM', 'WEAPON', 'ARMOR');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ownerProfileId" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubRace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "SubRace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceFeature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "FeatureType" NOT NULL,
    "maxUses" INTEGER,
    "refreshPeriod" "RefreshPeriod",
    "raceId" TEXT NOT NULL,
    "subRaceId" TEXT,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "RaceFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hitDice" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "BaseClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minLevel" INTEGER NOT NULL,
    "baseClassId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "SubClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassFeature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "levelGained" INTEGER NOT NULL,
    "type" "FeatureType" NOT NULL DEFAULT 'FEATURE',
    "description" TEXT NOT NULL,
    "maxUses" INTEGER,
    "refreshPeriod" "RefreshPeriod",
    "subClassId" TEXT,
    "baseClassId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "ClassFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "type" "InventoryType" NOT NULL,
    "characterId" TEXT,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "itemType" "InventoryItemType" NOT NULL,
    "referenceId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "equipped" BOOLEAN NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ammunition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Ammunition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rangeFt" INTEGER NOT NULL,
    "longRangeFt" INTEGER,
    "type" "WeaponType" NOT NULL,
    "ammunitionId" TEXT,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponProperty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "WeaponProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponPropertiesOnWeapon" (
    "weaponId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "WeaponPropertiesOnWeapon_pkey" PRIMARY KEY ("weaponId","propertyId")
);

-- CreateTable
CREATE TABLE "WeaponDamage" (
    "weaponId" TEXT NOT NULL,
    "diceCount" INTEGER NOT NULL,
    "dice" TEXT NOT NULL,
    "type" "DamageType" NOT NULL,

    CONSTRAINT "WeaponDamage_pkey" PRIMARY KEY ("weaponId","type")
);

-- CreateTable
CREATE TABLE "Armor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stealthDisadvantage" BOOLEAN NOT NULL,
    "strengthRequired" INTEGER,
    "baseAC" INTEGER,
    "bonusAC" INTEGER,
    "type" "ArmorType" NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,
    "subRaceId" TEXT,
    "strength" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "constitution" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "wisdom" INTEGER NOT NULL,
    "charisma" INTEGER NOT NULL,
    "spellcastingId" TEXT,
    "exhaustionLevel" INTEGER,
    "profileId" TEXT NOT NULL,
    "currentHitPoints" INTEGER NOT NULL,
    "maxHitPoints" INTEGER NOT NULL,
    "tempHitPoints" INTEGER NOT NULL,
    "deathSaveSuccesses" INTEGER NOT NULL DEFAULT 0,
    "deathSaveFailures" INTEGER NOT NULL DEFAULT 0,
    "remainingHitDice" INTEGER NOT NULL,
    "walkSpeedFt" INTEGER NOT NULL,
    "flySpeedFt" INTEGER NOT NULL,
    "climbSpeedFt" INTEGER NOT NULL,
    "swimSpeedFt" INTEGER NOT NULL,
    "burrowSpeedFt" INTEGER NOT NULL,
    "gender" TEXT,
    "alignment" TEXT,
    "background" TEXT,
    "deity" TEXT,
    "patron" TEXT,
    "darkvisionBrightFt" INTEGER NOT NULL,
    "darkvisionDimFt" INTEGER NOT NULL,
    "attacksPerAction" INTEGER NOT NULL,
    "maxAttunedItems" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhaustionEffect" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ExhaustionEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterCondition" (
    "characterId" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,

    CONSTRAINT "CharacterCondition_pkey" PRIMARY KEY ("characterId","conditionId")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConditionEffect" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "conditionId" TEXT NOT NULL,

    CONSTRAINT "ConditionEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterSpellcasting" (
    "characterId" TEXT NOT NULL,
    "maxPreparedSpells" INTEGER,
    "ability" "Ability" NOT NULL,

    CONSTRAINT "CharacterSpellcasting_pkey" PRIMARY KEY ("characterId")
);

-- CreateTable
CREATE TABLE "SpellSlots" (
    "characterId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "maxSlots" INTEGER NOT NULL,
    "slotsExpended" INTEGER NOT NULL,

    CONSTRAINT "SpellSlots_pkey" PRIMARY KEY ("characterId","level")
);

-- CreateTable
CREATE TABLE "CharacterSpell" (
    "characterId" TEXT NOT NULL,
    "spellId" TEXT NOT NULL,
    "prepared" BOOLEAN NOT NULL,

    CONSTRAINT "CharacterSpell_pkey" PRIMARY KEY ("characterId","spellId")
);

-- CreateTable
CREATE TABLE "CharacterClass" (
    "characterId" TEXT NOT NULL,
    "baseClassId" TEXT NOT NULL,
    "subClassId" TEXT,
    "level" INTEGER NOT NULL,

    CONSTRAINT "CharacterClass_pkey" PRIMARY KEY ("characterId","baseClassId")
);

-- CreateTable
CREATE TABLE "CharacterSkill" (
    "characterId" TEXT NOT NULL,
    "skill" "Skill" NOT NULL,
    "proficient" BOOLEAN NOT NULL,
    "expert" BOOLEAN NOT NULL,

    CONSTRAINT "CharacterSkill_pkey" PRIMARY KEY ("characterId","skill")
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

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "conversion" INTEGER NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterCurrency" (
    "characterId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "CharacterCurrency_pkey" PRIMARY KEY ("characterId","currencyId")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "verbal" BOOLEAN NOT NULL,
    "somatic" BOOLEAN NOT NULL,
    "material" BOOLEAN NOT NULL,
    "duration" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "castingTime" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellMaterial" (
    "spellId" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,

    CONSTRAINT "SpellMaterial_pkey" PRIMARY KEY ("spellId","materialId")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "materialType" "MaterialType" NOT NULL,
    "materialTypeId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicItem" (
    "itemId" TEXT NOT NULL,
    "magicItemType" "MagicItemType" NOT NULL,
    "requiresAttunement" BOOLEAN NOT NULL,

    CONSTRAINT "MagicItem_pkey" PRIMARY KEY ("itemId","magicItemType")
);

-- CreateTable
CREATE TABLE "CharacterNote" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "contents" TEXT NOT NULL,

    CONSTRAINT "CharacterNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_authId_key" ON "Profile"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "Source_slug_key" ON "Source"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Race_sourceId_slug_key" ON "Race"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "SubRace_sourceId_slug_key" ON "SubRace"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "RaceFeature_sourceId_slug_key" ON "RaceFeature"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "BaseClass_sourceId_slug_key" ON "BaseClass"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "SubClass_sourceId_slug_key" ON "SubClass"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "ClassFeature_sourceId_slug_key" ON "ClassFeature"("sourceId", "slug");

-- CreateIndex
CREATE INDEX "item_reference_idx" ON "InventoryItem"("referenceId", "itemType");

-- CreateIndex
CREATE UNIQUE INDEX "Ammunition_sourceId_slug_key" ON "Ammunition"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Item_sourceId_slug_key" ON "Item"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_sourceId_slug_key" ON "Weapon"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponProperty_sourceId_slug_key" ON "WeaponProperty"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_slug_key" ON "Armor"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_sourceId_slug_key" ON "Armor"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Condition_slug_key" ON "Condition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Condition_sourceId_slug_key" ON "Condition"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Language_slug_key" ON "Language"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Language_sourceId_slug_key" ON "Language"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_slug_key" ON "Currency"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_sourceId_slug_key" ON "Currency"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_slug_key" ON "Spell"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_sourceId_slug_key" ON "Spell"("sourceId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Material_slug_key" ON "Material"("slug");

-- CreateIndex
CREATE INDEX "materialType_materialTypeId_idx" ON "Material"("materialTypeId", "materialType");

-- CreateIndex
CREATE UNIQUE INDEX "Material_sourceId_slug_key" ON "Material"("sourceId", "slug");

-- CreateIndex
CREATE INDEX "magicItemType_itemId_idx" ON "MagicItem"("itemId", "magicItemType");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_ownerProfileId_fkey" FOREIGN KEY ("ownerProfileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_ownerProfileId_fkey" FOREIGN KEY ("ownerProfileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubRace" ADD CONSTRAINT "SubRace_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubRace" ADD CONSTRAINT "SubRace_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_subRaceId_fkey" FOREIGN KEY ("subRaceId") REFERENCES "SubRace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseClass" ADD CONSTRAINT "BaseClass_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubClass" ADD CONSTRAINT "SubClass_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubClass" ADD CONSTRAINT "SubClass_baseClassId_fkey" FOREIGN KEY ("baseClassId") REFERENCES "BaseClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_baseClassId_fkey" FOREIGN KEY ("baseClassId") REFERENCES "BaseClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_subClassId_fkey" FOREIGN KEY ("subClassId") REFERENCES "SubClass"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ammunition" ADD CONSTRAINT "Ammunition_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_ammunitionId_fkey" FOREIGN KEY ("ammunitionId") REFERENCES "Ammunition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponProperty" ADD CONSTRAINT "WeaponProperty_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponPropertiesOnWeapon" ADD CONSTRAINT "WeaponPropertiesOnWeapon_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponPropertiesOnWeapon" ADD CONSTRAINT "WeaponPropertiesOnWeapon_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "WeaponProperty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponDamage" ADD CONSTRAINT "WeaponDamage_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Character" ADD CONSTRAINT "Character_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterCondition" ADD CONSTRAINT "CharacterCondition_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterCondition" ADD CONSTRAINT "CharacterCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConditionEffect" ADD CONSTRAINT "ConditionEffect_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpellcasting" ADD CONSTRAINT "CharacterSpellcasting_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellSlots" ADD CONSTRAINT "SpellSlots_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "CharacterSpellcasting"("characterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "CharacterSpellcasting"("characterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterClass" ADD CONSTRAINT "CharacterClass_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterClass" ADD CONSTRAINT "CharacterClass_baseClassId_fkey" FOREIGN KEY ("baseClassId") REFERENCES "BaseClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterClass" ADD CONSTRAINT "CharacterClass_subClassId_fkey" FOREIGN KEY ("subClassId") REFERENCES "SubClass"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSkill" ADD CONSTRAINT "CharacterSkill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterCurrency" ADD CONSTRAINT "CharacterCurrency_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterCurrency" ADD CONSTRAINT "CharacterCurrency_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spell" ADD CONSTRAINT "Spell_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellMaterial" ADD CONSTRAINT "SpellMaterial_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellMaterial" ADD CONSTRAINT "SpellMaterial_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterNote" ADD CONSTRAINT "CharacterNote_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
