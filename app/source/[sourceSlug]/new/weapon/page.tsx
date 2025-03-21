import React from "react";
import { redirect } from "next/navigation";
import SourceHeader from "@/components/source/SourceHeader";
import { prisma } from "@/lib/prisma";
import WeaponForm from "@/components/forms/WeaponForm";

async function NewWeaponPage({
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
        <h4>New weapon</h4>
        <WeaponForm source={source} />
      </div>
    </div>
  );
}

export default NewWeaponPage;
