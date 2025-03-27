import { Currency, Source } from '@prisma/client'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface SourceCurrenciesProps {
  source: Source & {
    currencies: Currency[]
  }
}

function SourceCurrencies({ source }: SourceCurrenciesProps) {
  const currencyCell = (currency: Currency, index: number) => (
    <div key={index} className='rounded-lg border-1 border-yellow-500 shadow-md shadow-black p-2'>
      <h6>{currency.name}</h6>
    </div>
  )
  return (
    <div className='p-4 gap-4 flex flex-col'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h4>Currencies</h4>
          {source.currencies.length > 0 && (
            <Link href={`/source/${source.slug}/new/currency`}>
              <FilePlus />
            </Link>
          )}
        </div>
        {source.currencies.length > 0 ? (
          <div className='grid grid-cols-1 gap-2'>
            {source.currencies.map((currency, index) => currencyCell(currency, index))}
          </div>
        ) : (
          <>
            <p className='opacity-50 text-center'>No currencies yet</p>
            <Link className='primary-button self-center' href={`/source/${source.slug}/new/currency`}>Add new currency</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default SourceCurrencies