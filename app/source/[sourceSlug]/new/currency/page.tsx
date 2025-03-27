import CurrencyForm from '@/components/forms/CurrencyForm'
import SourceHeader from '@/components/source/SourceHeader'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

interface NewCurrencyPageProps {
  params: Promise<{ sourceSlug: string }>
}

async function NewCurrencyPage({ params }: NewCurrencyPageProps) {
  const { sourceSlug } = await params
  const source = await prisma.source.findFirst({
    where: {
      slug: sourceSlug
    }
  })

  if (!source) {
    redirect("/")
  }

  return (
    <div className='flex flex-col'>
      <SourceHeader source={source} />
      <div className='flex flex-col gap-4 p-4'>
        <h4>New currency</h4>
        <CurrencyForm source={source} />
      </div>
    </div>
  )
}

export default NewCurrencyPage