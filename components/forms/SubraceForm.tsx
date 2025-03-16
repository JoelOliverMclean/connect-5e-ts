"use client";
import React, { useState } from "react";
import { BaseForm, BaseFormData } from "./BaseForm";
import { apiPost } from "@/utils/apiUtils";
import { redirect } from "next/navigation";
import { Race, Source } from "@prisma/client";
import { Select } from "@headlessui/react";

function SubraceForm({
  source,
}: Readonly<{
  source: Source & {
    races: Race[];
  };
}>) {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitSubraceForm = (data: BaseFormData) => {
    apiPost("/api/subraces/new", data).then(({ response, data }) => {
      if (response.status === 200) {
        setError(null);
        redirect(`/source/${source.slug}/races/${data.slug}`);
      } else {
        setError(data.error);
      }
    });
  };

  const raceSelectOption = (race: Race, index: number) => (
    <option key={index} value={race.slug}>
      {race.name}
    </option>
  );

  return (
    <BaseForm onSubmitData={submitSubraceForm} error={error}>
      <Select className="" name="race">
        <option value={undefined}>Choose a race...</option>
        {source.races.map((race, index) => raceSelectOption(race, index))}
      </Select>
    </BaseForm>
  );
}

export default SubraceForm;
