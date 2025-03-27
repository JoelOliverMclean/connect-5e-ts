"use client"
import { Source } from '@prisma/client'
import React, { useState } from 'react'
import { BaseForm, BaseFormData } from './BaseForm'
import { apiPost } from '@/utils/apiUtils'
import { redirect } from 'next/navigation'

interface LanguageFormProps {
  source: Source
}

function LanguageForm({ source }: LanguageFormProps) {
  const [error, setError] = useState<string | undefined | null>(null)

  const submitLanguageForm = (data: BaseFormData) => {
    apiPost("/api/languages/new", data).then(({
      response,
      data
    }) => {
      if (response.status === 200) {
        setError(null)
        redirect(`/source/${source.slug}/languages/${data.slug}`)
      } else {
        setError(data.error)
      }
    })
  }

  return (
    <BaseForm onSubmitData={submitLanguageForm} error={error}>
      <input hidden readOnly type="text" name='sourceId' value={source.id} />
      <input type="text" name='name' placeholder='Name of language' />
      <textarea name='description' placeholder='Description of language' />
    </BaseForm>
  )
}

export default LanguageForm