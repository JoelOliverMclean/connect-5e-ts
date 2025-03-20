"use client";
import React, { useState } from "react";
import { BaseForm, BaseFormData } from "./BaseForm";
import { apiPost } from "@/utils/apiUtils";
import { redirect } from "next/navigation";
import { BaseClass, Source } from "@prisma/client";
import { Select } from "@headlessui/react";

function SubclassForm({
  source,
}: Readonly<{
  source: Source & {
    baseClasses: BaseClass[];
  };
}>) {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitSubclassForm = (data: BaseFormData) => {
    apiPost("/api/subclasses/new", {
      ...data,
      sourceId: source.id,
    }).then(({ response, data }) => {
      if (response.status === 200) {
        setError(null);
        redirect(`/source/${source.slug}/subclasses/${data.slug}`);
      } else {
        setError(data.error);
      }
    });
  };

  const baseClassSelectOption = (baseClass: BaseClass, index: number) => (
    <option key={index} value={baseClass.id}>
      {baseClass.name}
    </option>
  );

  return (
    <BaseForm onSubmitData={submitSubclassForm} error={error}>
      <Select name="baseClassId">
        <option value={undefined}>Choose a base class...</option>
        {source.baseClasses.map((baseClass, index) =>
          baseClassSelectOption(baseClass, index),
        )}
      </Select>
      <input type="text" name="name" placeholder="Subclass name..." />
      <textarea name="description" placeholder="Subclass description..." />
      <input
        type="number"
        name="minLevel"
        placeholder="Available at level..."
      />
    </BaseForm>
  );
}

export default SubclassForm;
