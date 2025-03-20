import React from "react";
import SourceHeader from "@/components/source/SourceHeader";
import { redirect } from "next/navigation";
import { RaceNavigation } from "@/components/source/race/RaceNavigation";
import { prisma } from "@/lib/prisma";

async function RacePage({
  params,
}: {
  params: Promise<{ sourceSlug: string; raceSlug: string }>;
}) {
  const { sourceSlug, raceSlug } = await params;

  const race = await prisma.race.findFirst({
    include: {
      source: true,
      subRaces: true,
    },
    where: {
      slug: raceSlug,
      source: {
        slug: sourceSlug,
      },
    },
  });

  if (!race) {
    redirect(`/source/${sourceSlug}`);
  }

  return (
    <div className="flex flex-col">
      <SourceHeader source={race.source}>
        <div>
          <p>Race</p>
          <h4>{race.name}</h4>
        </div>
      </SourceHeader>
      <RaceNavigation race={race} />
    </div>
  );
}

export default RacePage;
