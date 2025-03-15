"use client";
import React, { useState } from "react";
import { BaseForm, BaseFormData } from "./BaseForm";
import type { Source } from "@prisma/client";

function RaceForm({
  source,
}: Readonly<{
  source: Source;
}>) {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitRaceForm = (data: BaseFormData) => {
    console.log("POST new race:", {
      sourceId: source.id,
      ...data,
    });
  };

  return (
    <BaseForm onSubmitData={submitRaceForm} error={error}>
      <input type="text" name="name" placeholder="Name of race" />
      <textarea name="description" placeholder="Description of race" />
    </BaseForm>
  );
}

export default RaceForm;
