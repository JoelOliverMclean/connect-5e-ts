import React from "react";
import SourceHeader from "@/components/source/SourceHeader";
import { redirect } from "next/navigation";
import { ClassNavigation } from "@/components/source/class/ClassNavigation";
import { prisma } from "@/lib/prisma";

async function ClassPage({
  params,
}: {
  params: Promise<{ sourceSlug: string; classSlug: string }>;
}) {
  const { sourceSlug, classSlug } = await params;

  const baseClass = await prisma.baseClass.findFirst({
    include: {
      source: true,
      subClasses: true,
      features: true,
      characterAlterations: true,
    },
    where: {
      slug: classSlug,
      source: {
        slug: sourceSlug,
      },
    },
  });

  if (!baseClass) {
    redirect(`/source/${sourceSlug}`);
  }

  return (
    <div className="flex flex-col">
      <SourceHeader source={baseClass.source}>
        <div>
          <p>Class</p>
          <h4>{baseClass.name}</h4>
        </div>
      </SourceHeader>
      <ClassNavigation baseClass={baseClass} />
    </div>
  );
}

export default ClassPage;
