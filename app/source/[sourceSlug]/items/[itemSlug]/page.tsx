import SourceHeader from '@/components/source/SourceHeader';
import ItemNavigation from '@/components/source/tabs/item/ItemNavigation';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

interface ItemPageProps {
  params: Promise<{ sourceSlug: string; itemSlug: string; }>
}

async function ItemPage({ params }: ItemPageProps) {
  const { sourceSlug, itemSlug } = await params

  const item = await prisma.item.findFirst({
    include: {
      source: true,
      characterAlterations: true,
    },
    where: {
      slug: itemSlug,
      source: {
        slug: sourceSlug
      }
    }
  })

  if (!item) {
    redirect(`/source/${sourceSlug}`)
  }

  return (
    <div className='flex flex-col'>
      <SourceHeader source={item.source}>
        <div>
          <p>Item</p>
          <h4>{item.name}</h4>
        </div>
      </SourceHeader>
      <ItemNavigation item={item} />
    </div>
  )
}

export default ItemPage