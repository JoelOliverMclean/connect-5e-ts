import SubraceForm from "@/components/forms/SubraceForm";
import SourceHeader from "@/components/source/SourceHeader";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/lib/prisma";

async function NewSubracePage({
  params,
}: {
  params: Promise<{ sourceSlug: string }>;
}) {
  const { sourceSlug } = await params;
  const source = await prisma.source.findUnique({
    include: {
      races: true,
    },
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
        <h4>Create new subrace</h4>
        <SubraceForm source={source} />
      </div>
    </div>
  );
}

export default NewSubracePage;
