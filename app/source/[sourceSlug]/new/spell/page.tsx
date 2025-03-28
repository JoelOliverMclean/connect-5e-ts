import React from "react";
import { redirect } from "next/navigation";
import SourceHeader from "@/components/source/SourceHeader";
import { prisma } from "@/lib/prisma";
import SpellForm from "@/components/forms/SpellForm";

async function NewSpellPage({
  params,
  searchParams,
}: {
  params: Promise<{ sourceSlug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { sourceSlug } = await params;
  const levelNum = Number(((await searchParams).level as string) ?? "0");
  const level = isNaN(levelNum) ? 0 : levelNum;
  const source = await prisma.source.findUnique({
    include: {
      schools: true,
    },
    where: {
      slug: sourceSlug,
    },
  });

  if (!source) {
    redirect("/");
  }

  console.log(level);

  return (
    <div className="flex flex-col">
      <SourceHeader source={source} />
      <div className="flex flex-col gap-4 p-4">
        <h4>New spell</h4>
        <SpellForm source={source} level={level} />
      </div>
    </div>
  );
}

export default NewSpellPage;
