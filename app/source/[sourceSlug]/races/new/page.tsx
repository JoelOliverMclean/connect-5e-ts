import RaceForm from "@/components/forms/RaceForm";
import React from "react";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

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
      <div className="bg-red-800 p-4">
        <p>Source</p>
        <h4>{source?.name}</h4>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h4>Create new race</h4>
        <RaceForm source={source} />
      </div>
    </div>
  );
}

export default NewRacePage;
