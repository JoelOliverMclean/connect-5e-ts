import React from "react";
import SourceTabNavigation from "@/components/source/SourceTabNavigation";
import SourceHeader from "@/components/source/SourceHeader";
import { prisma } from "@/lib/prisma";

async function SourcePage({
  params,
}: {
  params: Promise<{ sourceSlug: string }>;
}) {
  const { sourceSlug } = await params;
  const source = await prisma.source.findUnique({
    where: {
      slug: sourceSlug,
    },
    include: {
      races: true,
      subRaces: true,
      baseClasses: true,
      subClasses: true,
      spells: true,
      weapons: true,
      armors: true,
      ammunitions: true,
      items: true,
      conditions: true,
      languages: true,
      currencies: true,
    },
  });

  if (!source) {
    return (
      <div className="p-4">
        <p>Source not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <SourceHeader source={source} />
      <SourceTabNavigation source={source} />
    </div>
  );
}

export default SourcePage;
