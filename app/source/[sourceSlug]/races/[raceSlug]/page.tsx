import React from "react";
import { PrismaClient } from "@prisma/client";
import SourceHeader from "@/components/source/SourceHeader";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

async function RacePage({
  params,
}: {
  params: Promise<{ sourceSlug: string; raceSlug: string }>;
}) {
  const { sourceSlug, raceSlug } = await params;

  const race = await prisma.race.findFirst({
    include: {
      source: true,
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
      <SourceHeader source={race.source} />
      <div className="flex flex-col gap-4 p-4">
        <div>
          <p>Race</p>
          <h4>{race.name}</h4>
        </div>
        <p>{race.description}</p>
      </div>
    </div>
  );
}

export default RacePage;
