import React from "react";
import SourceHeader from "@/components/source/SourceHeader";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SubraceNavigation } from "@/components/subrace/SubraceNavigation";

async function SubracePage({
  params,
}: {
  params: Promise<{ sourceSlug: string; subraceSlug: string }>;
}) {
  const { sourceSlug, subraceSlug } = await params;

  const subRace = await prisma.subRace.findFirst({
    include: {
      source: true,
      race: true,
    },
    where: {
      slug: subraceSlug,
      source: {
        slug: sourceSlug,
      },
    },
  });

  if (!subRace) {
    redirect(`/source/${sourceSlug}`);
  }

  return (
    <div className="flex flex-col">
      <SourceHeader source={subRace.source}>
        <div>
          <p>{subRace.race.name} Subrace</p>
          <h4>{subRace.name}</h4>
        </div>
      </SourceHeader>
      <SubraceNavigation subrace={subRace} />
    </div>
  );
}

export default SubracePage;
