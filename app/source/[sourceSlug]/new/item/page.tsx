import ItemForm from '@/components/forms/ItemForm'
import SourceHeader from '@/components/source/SourceHeader'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

interface NewItemPageProps {
  params: Promise<{ sourceSlug: string }>
}

async function NewItemPage({ params }: NewItemPageProps) {
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
        <h4>New item</h4>
        <ItemForm source={source} />
      </div>
    </div>
  )
}

export default NewItemPage