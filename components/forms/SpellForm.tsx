"use client";
import React, { useState } from "react";
import { BaseForm, BaseFormData } from "./BaseForm";
import { MagicSchool, Source } from "@prisma/client";
import { redirect } from "next/navigation";
import { apiPost } from "@/utils/apiUtils";
import { Check } from "lucide-react";

interface SpellFormProps {
  source: Source & {
    schools: MagicSchool[];
  };
  level: number;
}

function SpellForm({ source, level }: SpellFormProps) {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitSpellForm = (data: BaseFormData) => {
    apiPost("/api/spells/new", {
      ...data,
      sourceId: source.id,
    }).then(({ response, data }) => {
      if (response.status === 200) {
        setError(null);
        redirect(`/source/${source.slug}/spells/${data.slug}`);
      } else {
        setError(data.error);
      }
    });
  };

  const spellLevelOptions = Array.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9).map(
    (level) => (
      <option key={level} value={level}>
        {level === 0 ? "Cantrip" : `Level ${level}`}
      </option>
    ),
  );

  const [verbal, setVerbal] = useState("true");
  const [somatic, setSomatic] = useState("false");
  const [material, setMaterial] = useState("false");

  const checkbox = (value: string, setValue: (newVal: string) => void) => (
    <div
      className={`rounded-md border-1 bg-black ${value === "true" && "border-yellow-500"}`}
      onClick={() => setValue(value === "true" ? "false" : "true")}
    >
      <Check
        color={value === "true" ? "var(--color-yellow-500)" : "transparent"}
      />
    </div>
  );

  const spellSchoolOptions = source.schools.map((school, index) => (
    <option key={index} value={school.id}>
      {school.name}
    </option>
  ));

  return (
    <BaseForm onSubmitData={submitSpellForm} error={error}>
      <select defaultValue={level} name="level">
        {spellLevelOptions}
      </select>
      <select name="schoolId">
        <option value={undefined}>Choose a school...</option>
        {spellSchoolOptions}
      </select>
      <input type="text" name="name" placeholder="Name of spell" />
      <div className="flex justify-evenly">
        <div
          className="flex flex-col items-center gap-2"
          onClick={() => setVerbal(verbal === "true" ? "false" : "true")}
        >
          <label htmlFor="verbal">Verbal?</label>
          {checkbox(verbal, setVerbal)}
          <input hidden type="text" name="verbal" value={verbal} readOnly />
        </div>
        <div
          className="flex flex-col items-center gap-2"
          onClick={() => setSomatic(somatic === "true" ? "false" : "true")}
        >
          <label htmlFor="verbal">Somatic?</label>
          {checkbox(somatic, setSomatic)}
          <input hidden type="text" name="somatic" value={somatic} readOnly />
        </div>
        <div
          className="flex flex-col items-center gap-2"
          onClick={() => setMaterial(material === "true" ? "false" : "true")}
        >
          <label htmlFor="verbal">Material?</label>
          {checkbox(material, setMaterial)}
          <input hidden type="text" name="material" value={material} readOnly />
        </div>
      </div>
      <input type="text" name="duration" placeholder="Duration..." />
      <input type="text" name="castingTime" placeholder="Casting time..." />
      <input type="text" name="range" placeholder="Range..." />
      <textarea name="description" placeholder="Description of spell" />
    </BaseForm>
  );
}

export default SpellForm;
