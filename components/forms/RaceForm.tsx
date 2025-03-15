"use client";
import React, { useState } from "react";
import { BaseForm, BaseFormData } from "./BaseForm";
import type { Source } from "@prisma/client";
import { redirect } from "next/navigation";

const postRace = async (data: BaseFormData) => {
  const response = await fetch("/api/races/new", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

function RaceForm({
  source,
}: Readonly<{
  source: Source;
}>) {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitRaceForm = (data: BaseFormData) => {
    postRace({
      ...data,
      sourceId: source.id,
    }).then((data) => {
      if (!data.error) {
        setError(null);
        redirect(`/source/${source.slug}/races/${data.slug}`);
      } else {
        setError(data.error);
      }
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
