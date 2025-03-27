"use client"
import { Source } from '@prisma/client'
import React, { useState } from 'react'
import { BaseForm, BaseFormData } from './BaseForm'
import { apiPost } from '@/utils/apiUtils'
import { redirect } from 'next/navigation'

interface ConditionFormProps {
  source: Source
}

function ConditionForm({ source }: ConditionFormProps) {
  const [error, setError] = useState<string | undefined | null>(null)

  const submitConditionForm = (data: BaseFormData) => {
    apiPost("/api/conditions/new", data).then(({
      response,
      data
    }) => {
      if (response.status === 200) {
        setError(null)
        redirect(`/source/${source.slug}/conditions/${data.slug}`)
      } else {
        setError(data.error)
      }
    })
  }
  
  return (
    <BaseForm onSubmitData={submitConditionForm} error={error}>
      <input hidden readOnly type="text" name='sourceId' value={source.id} />
      <input type="text" name='name' placeholder='Name of condition' />
      <textarea name='description' placeholder='Description of condition' />
    </BaseForm>
  )
}

export default ConditionForm