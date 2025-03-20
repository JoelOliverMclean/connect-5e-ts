import React from "react";
import { redirect } from "next/navigation";
import SourceHeader from "@/components/source/SourceHeader";
import { prisma } from "@/lib/prisma";
import ClassForm from "@/components/forms/ClassForm";

async function NewClassPage({
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
        <h4>New class</h4>
        <ClassForm source={source} />
      </div>
    </div>
  );
}

export default NewClassPage;
