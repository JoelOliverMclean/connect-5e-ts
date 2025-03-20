import type { Source, Spell } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { FilePlus } from "lucide-react";
import TabNavigation from "@/components/navigation/TabNavigation";
import SpellsNavigation from "./spells/SpellsNavigation";

function SourceSpells({
  source,
}: Readonly<{
  source: Source & {
    spells: Spell[];
  };
}>) {
  return (
    <div className="flex flex-col">
      <SpellsNavigation sourceSlug={source.slug} spells={source.spells} />
    </div>
  );
}

export default SourceSpells;
