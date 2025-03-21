import React from "react";
import SourceHeader from "@/components/source/SourceHeader";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SubraceNavigation } from "@/components/source/tabs/subrace/SubraceNavigation";
import { capitalise } from "@/utils/textUtils";
import WeaponNavigation from "@/components/source/tabs/weapon/WeaponNavigation";

async function SubracePage({
  params,
}: {
  params: Promise<{ sourceSlug: string; weaponSlug: string }>;
}) {
  const { sourceSlug, weaponSlug } = await params;

  const weapon = await prisma.weapon.findFirst({
    include: {
      source: true,
      ammunition: true,
      damages: true,
      properties: true,
      characterAlterations: true,
    },
    where: {
      slug: weaponSlug,
      source: {
        slug: sourceSlug,
      },
    },
  });

  if (!weapon) {
    redirect(`/source/${sourceSlug}`);
  }

  return (
    <div className="flex flex-col">
      <SourceHeader source={weapon.source}>
        <div>
          <p>{capitalise(weapon.type.toLowerCase())} weapon</p>
          <h4>{weapon.name}</h4>
        </div>
      </SourceHeader>
      <WeaponNavigation weapon={weapon} />
    </div>
  );
}

export default SubracePage;
