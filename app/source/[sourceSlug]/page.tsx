import React from "react";
import { PrismaClient } from "@prisma/client";
import SourceRaces from "@/components/source/SourceRaces";
import SourceSubRaces from "@/components/source/SourceSubraces";
import SourceTabNavigation from "@/components/source/SourceTabNavigation";

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
      <div className="bg-red-800 p-4">
        <p>Source</p>
        <h4>{source?.name}</h4>
      </div>
      <SourceTabNavigation
        source={source}
        races={source.races}
        subRaces={source.subRaces}
      />
    </div>
  );
}

export default SourcePage;
