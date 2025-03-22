"use client";
import React, { useState } from "react";
import { BaseForm, BaseFormData } from "./BaseForm";
import { WeaponType, type Source } from "@prisma/client";
import { redirect } from "next/navigation";
import { apiPost } from "@/utils/apiUtils";
import { capitalise } from "@/utils/textUtils";

function WeaponForm({
  source,
}: Readonly<{
  source: Source;
}>) {
  const [error, setError] = useState<string | null | undefined>(null);
  const [type, setType] = useState<WeaponType | null | undefined>(null);

  const submitWeaponForm = (data: BaseFormData) => {
    apiPost("/api/weapons/new", data).then(({ response, data }) => {
      if (response.status === 200) {
        setError(null);
        redirect(`/source/${source.slug}/weapons/${data.slug}`);
      } else {
        setError(data.error);
      }
    });
  };

  const onTypeChanged = (event: React.FormEvent<HTMLSelectElement>) => {
    var type = event.currentTarget.value as WeaponType | undefined;
    setType(type);
  };

  const weaponTypeOptions = Object.keys(WeaponType).map((type, index) => (
    <option key={index} value={type}>{capitalise(type.toLowerCase())}</option>
  ))

  return (
    <BaseForm onSubmitData={submitWeaponForm} error={error}>
      <input type="text" name="name" placeholder="Name of weapon" />
      <textarea name="description" placeholder="Description of weapon" />
      <select name="type" onChange={onTypeChanged}>
        <option value={undefined}>Select weapon type...</option>
        {weaponTypeOptions}
      </select>
      {type === WeaponType.RANGED && (
        <>
          <input
            type="number"
            name="rangeFt"
            placeholder="Range in ft (e.g. 60)"
          />
          <input
            type="number"
            name="longRangeFt"
            placeholder="Longest Range in ft (e.g. 320)"
          />
        </>
      )}
      {type === WeaponType.MELEE && (
        <input
          type="number"
          name="rangeFt"
          placeholder="Weapon Reach in ft (e.g. 5)"
        />
      )}
      <input hidden type="text" name="sourceId" value={source.id} />
    </BaseForm>
  );
}

export default WeaponForm;
