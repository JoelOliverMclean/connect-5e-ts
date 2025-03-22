"use client"
import { Source } from '@prisma/client';
import React, { useState } from 'react'
import { BaseForm, BaseFormData } from './BaseForm';
import { apiPost } from '@/utils/apiUtils';
import { redirect } from 'next/navigation';

function AmmunitionForm({
  source,
}: Readonly<{
  source: Source;
}>) {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitAmmunitionForm = (data: BaseFormData) => {
    apiPost("/api/ammunition/new", data).then(({
      response,
      data
    }) => {
      if (response.status === 200) {
        setError(null)
        redirect(`/source/${source.slug}/ammunition/${data.slug}`)
      } else {
        setError(data.error);
      }
    });
  };

  return (
    <BaseForm onSubmitData={submitAmmunitionForm} error={error}>
      <input type="text" name='name' placeholder='Name of ammunition' />
      <textarea name="description" placeholder='Description of ammunition' />
      <input type="text" hidden name='sourceId' value={source.id} />
    </BaseForm>
  )
}

export default AmmunitionForm