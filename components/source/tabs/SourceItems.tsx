import { Item, Source } from '@prisma/client'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface SourceItemsProps {
  source: Source & {
    items: Item[]
  }
}

function SourceItems({ source }: SourceItemsProps) {
  const itemCell = (item: Item, index: number) => (
    <div key={index}
    className='rounded-lg border-1 border-yellow-500 shadow-md shadow-black p-2'>
      <h4>{item.name}</h4>
    </div>
  )

  return (
    <div className='p-4 gap-4 flex flex-col'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h4>Items</h4>
          {source.items.length > 0 && (
            <Link href={`/source/${source.slug}/new/item`}>
              <FilePlus />
            </Link>
          )}
        </div>
        {source.items.length > 0 ? (
          <div className='grid grid-cols-1 gap-2'>
            {source.items.map((item, index) => itemCell(item, index))}
          </div>
        ) : (
          <>
            <p className='opacity-50 text-center'>No items yet</p>
            <Link className='primary-button self-center' href={`/source/${source.slug}/new/item`}>Add new item</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default SourceItems