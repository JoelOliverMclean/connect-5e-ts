"use client"
import { Source } from '@prisma/client'
import React, { useState } from 'react'
import { BaseForm, BaseFormData } from './BaseForm'
import { apiPost } from '@/utils/apiUtils'
import { redirect } from 'next/navigation'

interface ItemFormProps {
  source: Source
}

function ItemForm({ source }: ItemFormProps) {
  const [error, setError] = useState<string | undefined | null>(null)

  const submitItemForm = (data: BaseFormData) => {
    apiPost("/api/items/new", data).then(({
      response,
      data
    }) => {
      if (response.status === 200) {
        setError(null)
        redirect(`/source/${source.slug}/items/${data.slug}`)
      } else {
        setError(data.error)
      }
    })
  }

  return (
    <BaseForm onSubmitData={submitItemForm} error={error}>
      <input hidden readOnly type="text" name='sourceId' value={source.id} />
      <input type="text" name='name' placeholder='Name of item' />
      <textarea name='description' placeholder='Description of item' />
    </BaseForm>
  )
}

export default ItemForm