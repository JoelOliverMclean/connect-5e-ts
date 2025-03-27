import ConditionForm from '@/components/forms/ConditionForm'
import SourceHeader from '@/components/source/SourceHeader'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

interface NewConditionPageProps {
  params: Promise<{ sourceSlug: string }>
}

async function NewConditionPage({ params }: NewConditionPageProps) {
  const { sourceSlug } = await params
  const source = await prisma.source.findFirst({
    where: {
      slug: sourceSlug
    }
  })

  if (!source) {
    redirect('/')
  }

  return (
    <div className='flex flex-col'>
      <SourceHeader source={source} />
      <div className='flex flex-col gap-4 p-4'>
        <h4>New condition</h4>
        <ConditionForm source={source} />
      </div>
    </div>
  )
}

export default NewConditionPage