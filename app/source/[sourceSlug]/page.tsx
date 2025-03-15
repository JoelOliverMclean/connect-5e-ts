import React from "react";
import { PrismaClient } from "@prisma/client";
import SourceRaces from "@/components/source/SourceRaces";
import SourceSubRaces from "@/components/source/SourceSubraces";

const prisma = new PrismaClient();

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
      <div className="p-4">
        <p>Source</p>
        <h4>{source?.name}</h4>
      </div>
      <div className="flex overflow-x-auto gap-2 p-2 bg-red-800">
        <div className="px-4 py-2 rounded">Races</div>
        <div className="px-4 py-2 rounded">Classes</div>
        <div className="px-4 py-2 rounded">Spells</div>
        <div className="px-4 py-2 rounded">Weapons</div>
        <div className="px-4 py-2 rounded">Ammunitions</div>
        <div className="px-4 py-2 rounded">Armor</div>
        <div className="px-4 py-2 rounded">Items</div>
        <div className="px-4 py-2 rounded">Conditions</div>
        <div className="px-4 py-2 rounded">Language</div>
        <div className="px-4 py-2 rounded">Currencies</div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <SourceRaces races={source.races} />
        <SourceSubRaces subRaces={source.subRaces} />
      </div>
    </div>
  );
}

export default SourcePage;
