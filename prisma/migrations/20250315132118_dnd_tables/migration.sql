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
CREATE TYPE "Ability" AS ENUM ('STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'INTELLIGENCE', 'WISDOM', 'CHARISMA');

-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('ACROBATICS', 'ANIMAL_HANDLING', 'ARCANA', 'ATHLETICS', 'DECEPTION', 'HISTORY', 'INSIGHT', 'INTIMIDATION', 'INVESTIGATION', 'MEDICINE', 'NATURE', 'PERCEPTION', 'PERFORMANCE', 'PERSUASION', 'RELIGION', 'SLEIGHT_OF_HAND', 'STEALTH', 'SURVIVAL');

-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('ITEM');

-- CreateEnum
CREATE TYPE "MagicItemType" AS ENUM ('ITEM', 'WEAPON', 'ARMOR');

-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubRace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "raceId" TEXT NOT NULL,

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

    CONSTRAINT "RaceFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minLevel" INTEGER NOT NULL,
    "baseClassId" TEXT NOT NULL,

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

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ammunition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Ammunition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,

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

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponProperty" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "WeaponProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponPropertiesOnWeapon" (
    "weaponId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "WeaponPropertiesOnWeapon_pkey" PRIMARY KEY ("weaponId","propertyId")
);

-- CreateTable
CREATE TABLE "WeaponDamage" (
    "id" TEXT NOT NULL,
    "weaponId" TEXT NOT NULL,
    "diceCount" INTEGER NOT NULL,
    "dice" TEXT NOT NULL,
    "type" "DamageType" NOT NULL,

    CONSTRAINT "WeaponDamage_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
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
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "maxPrepared" INTEGER,

    CONSTRAINT "CharacterSpellcasting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellSlots" (
    "characterSpellcastingId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "maxSlots" INTEGER NOT NULL,
    "slotsExpended" INTEGER NOT NULL,

    CONSTRAINT "SpellSlots_pkey" PRIMARY KEY ("characterSpellcastingId","level")
);

-- CreateTable
CREATE TABLE "CharacterSpell" (
    "characterSpellcastingId" TEXT NOT NULL,
    "spellId" TEXT NOT NULL,
    "prepared" BOOLEAN NOT NULL,

    CONSTRAINT "CharacterSpell_pkey" PRIMARY KEY ("characterSpellcastingId","spellId")
);

-- CreateTable
CREATE TABLE "CharacterClass" (
    "characterId" TEXT NOT NULL,
    "baseClassId" TEXT NOT NULL,
    "subClassId" TEXT,

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
CREATE TABLE "CharacterProficiency" (
    "characterId" TEXT NOT NULL,
    "type" "ProficiencyType" NOT NULL,
    "typeId" TEXT NOT NULL,
    "sourceType" "ProficiencySource" NOT NULL,
    "sourceTypeId" TEXT NOT NULL,

    CONSTRAINT "CharacterProficiency_pkey" PRIMARY KEY ("characterId","typeId")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "conversion" INTEGER NOT NULL,

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

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagicItem" (
    "itemId" TEXT NOT NULL,
    "magicItemType" "MagicItemType" NOT NULL,
    "requiresAttunement" BOOLEAN NOT NULL,

    CONSTRAINT "MagicItem_pkey" PRIMARY KEY ("itemId","magicItemType")
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_slug_key" ON "Race"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SubRace_slug_key" ON "SubRace"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RaceFeature_slug_key" ON "RaceFeature"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SubClass_name_key" ON "SubClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubClass_slug_key" ON "SubClass"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ClassFeature_slug_key" ON "ClassFeature"("slug");

-- CreateIndex
CREATE INDEX "item_reference_idx" ON "InventoryItem"("referenceId", "itemType");

-- CreateIndex
CREATE UNIQUE INDEX "Ammunition_slug_key" ON "Ammunition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Item_slug_key" ON "Item"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_slug_key" ON "Weapon"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponProperty_slug_key" ON "WeaponProperty"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_slug_key" ON "Armor"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Condition_slug_key" ON "Condition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSpellcasting_characterId_key" ON "CharacterSpellcasting"("characterId");

-- CreateIndex
CREATE INDEX "type_typeId_idx" ON "CharacterProficiency"("typeId", "type");

-- CreateIndex
CREATE INDEX "sourceType_sourceTypeId_idx" ON "CharacterProficiency"("sourceTypeId", "sourceType");

-- CreateIndex
CREATE UNIQUE INDEX "Languages_slug_key" ON "Languages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_slug_key" ON "Currency"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_slug_key" ON "Spell"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Material_slug_key" ON "Material"("slug");

-- CreateIndex
CREATE INDEX "materialType_materialTypeId_idx" ON "Material"("materialTypeId", "materialType");

-- CreateIndex
CREATE INDEX "magicItemType_itemId_idx" ON "MagicItem"("itemId", "magicItemType");

-- AddForeignKey
ALTER TABLE "SubRace" ADD CONSTRAINT "SubRace_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceFeature" ADD CONSTRAINT "RaceFeature_subRaceId_fkey" FOREIGN KEY ("subRaceId") REFERENCES "SubRace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubClass" ADD CONSTRAINT "SubClass_baseClassId_fkey" FOREIGN KEY ("baseClassId") REFERENCES "BaseClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_baseClassId_fkey" FOREIGN KEY ("baseClassId") REFERENCES "BaseClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassFeature" ADD CONSTRAINT "ClassFeature_subClassId_fkey" FOREIGN KEY ("subClassId") REFERENCES "SubClass"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_ammunitionId_fkey" FOREIGN KEY ("ammunitionId") REFERENCES "Ammunition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponPropertiesOnWeapon" ADD CONSTRAINT "WeaponPropertiesOnWeapon_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponPropertiesOnWeapon" ADD CONSTRAINT "WeaponPropertiesOnWeapon_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "WeaponProperty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponDamage" ADD CONSTRAINT "WeaponDamage_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterCondition" ADD CONSTRAINT "CharacterCondition_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterCondition" ADD CONSTRAINT "CharacterCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConditionEffect" ADD CONSTRAINT "ConditionEffect_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpellcasting" ADD CONSTRAINT "CharacterSpellcasting_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellSlots" ADD CONSTRAINT "SpellSlots_characterSpellcastingId_fkey" FOREIGN KEY ("characterSpellcastingId") REFERENCES "CharacterSpellcasting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterSpell" ADD CONSTRAINT "CharacterSpell_characterSpellcastingId_fkey" FOREIGN KEY ("characterSpellcastingId") REFERENCES "CharacterSpellcasting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "CharacterProficiency" ADD CONSTRAINT "CharacterProficiency_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterCurrency" ADD CONSTRAINT "CharacterCurrency_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterCurrency" ADD CONSTRAINT "CharacterCurrency_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellMaterial" ADD CONSTRAINT "SpellMaterial_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellMaterial" ADD CONSTRAINT "SpellMaterial_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
