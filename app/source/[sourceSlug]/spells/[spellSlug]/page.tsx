import React from "react";
import SourceHeader from "@/components/source/SourceHeader";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SubclassNavigation } from "@/components/source/tabs/subclass/SubclassNavigation";

async function SpellPage({
  params,
}: {
  params: Promise<{ sourceSlug: string; spellSlug: string }>;
}) {
  const { sourceSlug, spellSlug } = await params;

  const spell = await prisma.spell.findFirst({
    include: {
      source: true,
    },
    where: {
      slug: spellSlug,
      source: {
        slug: sourceSlug,
      },
    },
  });

  if (!spell) {
    redirect(`/source/${sourceSlug}`);
  }

  return (
    <div className="flex flex-col">
      <SourceHeader source={spell.source}>
        <div>
          <p>{spell.level === 0 ? "Cantrip" : `Level ${spell.level} spell`}</p>
          <h4>{spell.name}</h4>
        </div>
      </SourceHeader>
      {/* <SpellNavigation spell={spell} /> */}
    </div>
  );
}

export default SpellPage;
