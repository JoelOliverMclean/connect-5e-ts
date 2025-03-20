import React from "react";
import { redirect } from "next/navigation";
import SourceHeader from "@/components/source/SourceHeader";
import { prisma } from "@/lib/prisma";
import ClassForm from "@/components/forms/ClassForm";
import SpellForm from "@/components/forms/SpellForm";

async function NewSpellPage({
  params,
  searchParams,
}: {
  params: Promise<{ sourceSlug: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sourceSlug } = await params;
  const source = await prisma.source.findUnique({
    where: {
      slug: sourceSlug,
    },
  });

  if (!source) {
    redirect("/");
  }
  return (
    <div className="flex flex-col">
      <SourceHeader source={source} />
      <div className="flex flex-col gap-4 p-4">
        <h4>New spell</h4>
        <SpellForm
          source={source}
          level={
            searchParams?.level ? parseInt(searchParams?.level as string) : 0
          }
        />
      </div>
    </div>
  );
}

export default NewSpellPage;
