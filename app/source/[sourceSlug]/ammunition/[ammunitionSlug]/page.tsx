import SourceHeader from '@/components/source/SourceHeader';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

async function AmmunitionPage({
  params,
}: {
  params: Promise<{ sourceSlug: string; ammunitionSlug: string }>;
}) {
  const { sourceSlug, ammunitionSlug } = await params;
  const ammunition = await prisma.ammunition.findFirst({
    include: {
      source: true
    },
    where: {
      slug: ammunitionSlug,
      source: {
        slug: sourceSlug
      }
    }
  })

  if (!ammunition) {
    redirect(`/source/${sourceSlug}`)
  }

  return (
    <div className='flex flex-col'>
      <SourceHeader source={ammunition.source}>
      <div>
          <p>Ammunition</p>
          <h4>{ammunition.name}</h4>
        </div>
      </SourceHeader>
    </div>
  )
}

export default AmmunitionPage