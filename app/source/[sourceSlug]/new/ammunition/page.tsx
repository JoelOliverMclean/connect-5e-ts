import AmmunitionForm from '@/components/forms/AmmunitionForm';
import SourceHeader from '@/components/source/SourceHeader';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

async function NewAmmunitionPage({
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
    <div className='flex flex-col'>
      <SourceHeader source={source} />
      <div className='flex flex-col gap-4 p-4'>
        <h4>New ammunition</h4>
        <AmmunitionForm source={source} />
      </div>
    </div>
  )
}

export default NewAmmunitionPage