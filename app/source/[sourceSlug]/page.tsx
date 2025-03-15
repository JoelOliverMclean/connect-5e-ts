import React from "react";
import { PrismaClient } from "@prisma/client";
import SourceRaces from "@/components/source/SourceRaces";
import SourceSubRaces from "@/components/source/SourceSubraces";
import SourceTabNavigation from "@/components/source/SourceTabNavigation";
import SourceHeader from "@/components/source/SourceHeader";

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
      <SourceHeader source={source} />
      <SourceTabNavigation
        source={source}
        races={source.races}
        subRaces={source.subRaces}
      />
    </div>
  );
}

export default SourcePage;
