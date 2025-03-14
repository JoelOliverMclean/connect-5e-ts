-- CreateTable
CREATE TABLE "BaseClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hitDice" TEXT NOT NULL,

    CONSTRAINT "BaseClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseClass_name_key" ON "BaseClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BaseClass_slug_key" ON "BaseClass"("slug");

