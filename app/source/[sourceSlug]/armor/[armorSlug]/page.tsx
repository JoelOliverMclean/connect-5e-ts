import SourceHeader from '@/components/source/SourceHeader';
import ArmorNavigation from '@/components/source/tabs/armor/ArmorNavigation';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

async function ArmorPage({
  params
}: {
  params: Promise<{ sourceSlug: string; armorSlug: string; }>
}) {
  const { sourceSlug, armorSlug } = await params

  const armor = await prisma.armor.findFirst({
    include: {
      source: true,
      characterAlterations: true
    },
    where: {
      slug: armorSlug,
      source: {
        slug: sourceSlug
      }
    }
  })

  if (!armor) {
    redirect(`/source/${sourceSlug}`)
  }

  return (
    <div className='flex flex-col'>
      <SourceHeader source={armor.source}>
        <div>
          <p>Armor</p>
          <h4>{armor.name}</h4>
        </div>
      </SourceHeader>
      <ArmorNavigation armor={armor} />
    </div>
  )
}

export default ArmorPage