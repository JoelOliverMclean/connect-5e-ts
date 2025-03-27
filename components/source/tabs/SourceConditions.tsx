import { Condition, Source } from '@prisma/client'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface SourceConditionsProps {
  source: Source & {
    conditions: Condition[]
  }
}

function SourceConditions({source}: SourceConditionsProps) {
  const conditionCell = (condition: Condition, index: number) => (
    <div key={index} className='rounded-lg border-1 border-yellow-500 shadow-md shadow-black p-2'>
      <h6>{condition.name}</h6>
    </div>
  )

  return (
    <div className='p-4 gap-4 flex flex-col'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h4>Conditions</h4>
          {source.conditions.length > 0 && (
            <Link href={`/source/${source.slug}/new/condition`}>
              <FilePlus />
            </Link>
          )}
        </div>
        {source.conditions.length > 0 ? (
          <div className='grid grid-cols-1 gap-2'>
            {source.conditions.map((condition, index) => conditionCell(condition, index))}
          </div>
        ) : (
          <>
            <p className='opacity-50 text-center'>No conditions yet</p>
            <Link className='primary-button self-center' href={`/source/${source.slug}/new/condition`}>Add new condition</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default SourceConditions