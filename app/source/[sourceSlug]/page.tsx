import React from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function SourcePage({
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
    return (
      <div className="p-4">
        <p>Source not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <p>Source</p>
        <h4>{source?.name}</h4>
      </div>
    </div>
  );
}

export default SourcePage;
