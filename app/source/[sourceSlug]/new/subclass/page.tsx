import SourceHeader from "@/components/source/SourceHeader";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/lib/prisma";
import SubclassForm from "@/components/forms/SubclassForm";

async function NewSubclassPage({
  params,
}: {
  params: Promise<{ sourceSlug: string }>;
}) {
  const { sourceSlug } = await params;
  const source = await prisma.source.findUnique({
    include: {
      baseClasses: true,
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
        <h4>New subclass</h4>
        <SubclassForm source={source} />
      </div>
    </div>
  );
}

export default NewSubclassPage;
