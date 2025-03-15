import RaceForm from "@/components/forms/RaceForm";
import React from "react";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import SourceHeader from "@/components/source/SourceHeader";

const prisma = new PrismaClient();

async function NewRacePage({
  params,
}: {
  params: Promise<{ sourceSlug: string }>;
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
        <h4>Create new race</h4>
        <RaceForm source={source} />
      </div>
    </div>
  );
}

export default NewRacePage;
