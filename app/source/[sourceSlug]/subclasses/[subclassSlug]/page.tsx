import React from "react";
import SourceHeader from "@/components/source/SourceHeader";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SubclassNavigation } from "@/components/source/subclass/SubclassNavigation";

async function SubclassPage({
  params,
}: {
  params: Promise<{ sourceSlug: string; subclassSlug: string }>;
}) {
  const { sourceSlug, subclassSlug } = await params;

  const subClass = await prisma.subClass.findFirst({
    include: {
      source: true,
      baseClass: true,
    },
    where: {
      slug: subclassSlug,
      source: {
        slug: sourceSlug,
      },
    },
  });

  if (!subClass) {
    redirect(`/source/${sourceSlug}`);
  }

  return (
    <div className="flex flex-col">
      <SourceHeader source={subClass.source}>
        <div>
          <p>{subClass.baseClass.name} Subclass</p>
          <h4>{subClass.name}</h4>
        </div>
      </SourceHeader>
      <SubclassNavigation subclass={subClass} />
    </div>
  );
}

export default SubclassPage;
