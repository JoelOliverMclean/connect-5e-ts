import { Armor, Source } from '@prisma/client'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function SourceArmor({
  source
}: Readonly<{
  source: Source & {
    armors: Armor[]
  }
}>) {

  const armorCell = (armor: Armor, index: number) => (
    <div
      key={index}
      className="rounded-lg border-1 border-yellow-500 shadow-md shadow-black p-2" >
      {armor.name}
    </div>
  )

  return (
    <div className='p-4 gap-4 flex flex-col'>
      <div className='flex flex-col gap-2'>
        <div className="flex items-center justify-between">
          <h4 className="">Armor</h4>
          {source.armors.length > 0 && (
            <Link href={`/source/${source.slug}/new/armor`}>
              <FilePlus />
            </Link>
          )}
        </div>
        {source.armors.length > 0 ? (
          <div className='grid grid-cols-1 gap-2'>
            {source.armors.map((source, index) => armorCell(source, index))}
          </div>
        ) : (
          <>
            <p className='opacity-50 text-center'>No armor yet</p>
            <Link className='primary-button self-center' href={`/source/${source.slug}/new/armor`}>Add new armor</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default SourceArmor