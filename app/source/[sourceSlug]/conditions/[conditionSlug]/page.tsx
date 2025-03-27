import SourceHeader from '@/components/source/SourceHeader';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

interface ConditionPageProps {
  params: Promise<{ sourceSlug: string; conditionSlug: string; }>
}

async function ConditionPage({ params }: ConditionPageProps) {
  const { sourceSlug, conditionSlug } = await params

  const condition = await prisma.condition.findFirst({
    include: {
      source: true,
      conditionEffects: true,
    },
    where: {
      slug: conditionSlug,
      source: {
        slug: sourceSlug
      }
    }
  })

  if (!condition) {
    redirect(`/source/${sourceSlug}`)
  }

  return (
    <div className='flex flex-col'>
      <SourceHeader source={condition.source}>
        <div>
          <p>Condition</p>
          <h4>{condition.name}</h4>
        </div>
      </SourceHeader>
      <div className='p-4'>
        <p>{condition.description}</p>
      </div>
    </div>
  )
}

export default ConditionPage