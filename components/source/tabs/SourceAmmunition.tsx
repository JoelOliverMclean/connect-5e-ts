import { Ammunition, Source } from '@prisma/client'
import { FilePlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function SourceAmmunition({
  source
}: Readonly<{
  source: Source & {
    ammunitions: Ammunition[];
  }
}>) {
  const ammoCell = (ammo: Ammunition, index: number) => (
    <div
      className="rounded-lg border-1 border-yellow-500 shadow-md shadow-black p-2"
      key={index}
    >
      <h6>{ammo.name}</h6>
    </div>
  );
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="">Ammunitions</h4>
          {source.ammunitions.length > 0 && (
            <Link href={`/source/${source.slug}/new/ammunition`}>
              <FilePlus />
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {source.ammunitions.length > 0 ? (
            source.ammunitions.map((ammunition, index) => ammoCell(ammunition, index))
          ) : (
            <>
              <div className="text-center opacity-50">No ammunition yet</div>
              <Link
                href={`/source/${source.slug}/new/ammunition`}
                className="primary-button self-center"
              >
                Create new ammunition
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SourceAmmunition