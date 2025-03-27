import SourceHeader from '@/components/source/SourceHeader';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

interface LanguagePageProps {
  params: Promise<{ sourceSlug: string; languageSlug: string; }>
}

async function LanguagePage({ params }: LanguagePageProps) {
  const { sourceSlug, languageSlug } = await params

  const language = await prisma.language.findFirst({
    include: {
      source: true
    },
    where: {
      slug: languageSlug,
      source: {
        slug: sourceSlug
      }
    }
  })

  if (!language) {
    redirect(`/source/${sourceSlug}`)
  }

  return (
    <div className='flex flex-col'>
      <SourceHeader source={language.source}>
        <div>
          <p>Language</p>
          <h4>{language.name}</h4>
        </div>
      </SourceHeader>
      <div>
        {language.description}
      </div>
    </div>
  )
}

export default LanguagePage