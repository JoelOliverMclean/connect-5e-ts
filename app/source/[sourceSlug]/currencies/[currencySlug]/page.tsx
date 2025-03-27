import SourceHeader from '@/components/source/SourceHeader';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

interface CurrencyPageProps {
  params: Promise<{ sourceSlug: string; currencySlug: string }>
}

async function CurrencyPage({ params }: CurrencyPageProps) {
  const { sourceSlug, currencySlug } = await params

  const currency = await prisma.currency.findFirst({
    include: {
      source: true
    },
    where: {
      slug: currencySlug,
      source: {
        slug: sourceSlug
      }
    }
  })

  if (!currency) {
    redirect(`/source/${sourceSlug}`)
  }

  return (
    <div className='flex flex-col'>
      <SourceHeader source={currency.source}>
        <div>
          <p>Currency</p>
          <h4>{currency.name}</h4>
        </div>
      </SourceHeader>
      <div className='p-4'>
        
      </div>
    </div>
  )
}

export default CurrencyPage