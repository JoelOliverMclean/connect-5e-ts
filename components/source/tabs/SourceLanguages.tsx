import { Language, Source } from '@prisma/client'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface SourceLanguagesProps {
  source: Source & {
    languages: Language[]
  }
}

function SourceLanguages({ source }: SourceLanguagesProps) {
  const languageCell = (language: Language, index: number) => (
    <div key={index} className='rounded-lg border-1 border-yellow-500 shadow-md shadow-black p-2'>
      <h6>{language.name}</h6>
    </div>
  )

  return (
    <div className='p-4 gap-4 flex flex-col'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h4>Languages</h4>
          {source.languages.length > 0 && (
            <Link href={`/source/${source.slug}/new/language`}>
              <FilePlus />
            </Link>
          )}
        </div>
        {source.languages.length > 0 ? (
          <div className='grid grid-cols-1 gap-2'>
            {source.languages.map((language, index) => languageCell(language, index))}
          </div>
        ) : (
          <>
            <p className='opacity-50 text-center'>No languages yet</p>
            <Link className='primary-button self-center' href={`/source/${source.slug}/new/language`}>Add new language</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default SourceLanguages