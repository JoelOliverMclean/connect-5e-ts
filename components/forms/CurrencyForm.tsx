"use client"
import { Source } from '@prisma/client'
import React, { useState } from 'react'
import { BaseForm, BaseFormData } from './BaseForm'
import { apiPost } from '@/utils/apiUtils'
import { redirect } from 'next/navigation'

interface CurrencyFormProps {
  source: Source
}

function CurrencyForm({ source }: CurrencyFormProps) {
  const [error, setError] = useState<string | undefined | null>(null)

  const submitCurrencyForm = (data: BaseFormData) => {
    apiPost("/api/currencies/new", data).then(({
      response,
      data
    }) => {
      if (response.status === 200) {
        setError(null)
        redirect(`/source/${source.slug}/currencies/${data.slug}`)
      } else {
        setError(data.error)
      }
    })
  }

  return (
    <BaseForm onSubmitData={submitCurrencyForm} error={error}>
      <input hidden readOnly type="text" name='sourceId' value={source.id} />
      <input type="text" name='name' placeholder='Name of currency' />
      <input type="number" name='conversion' placeholder='Denomination e.g. 1, 10, 100' />
    </BaseForm>
  )
}

export default CurrencyForm