-- CreateTable
CREATE TABLE "_BaseClassToSpell" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BaseClassToSpell_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SpellToSubClass" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SpellToSubClass_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BaseClassToSpell_B_index" ON "_BaseClassToSpell"("B");

-- CreateIndex
CREATE INDEX "_SpellToSubClass_B_index" ON "_SpellToSubClass"("B");

-- AddForeignKey
ALTER TABLE "_BaseClassToSpell" ADD CONSTRAINT "_BaseClassToSpell_A_fkey" FOREIGN KEY ("A") REFERENCES "BaseClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BaseClassToSpell" ADD CONSTRAINT "_BaseClassToSpell_B_fkey" FOREIGN KEY ("B") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpellToSubClass" ADD CONSTRAINT "_SpellToSubClass_A_fkey" FOREIGN KEY ("A") REFERENCES "Spell"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpellToSubClass" ADD CONSTRAINT "_SpellToSubClass_B_fkey" FOREIGN KEY ("B") REFERENCES "SubClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
