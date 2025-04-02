"use client";
import React, { useState } from "react";
import { BaseForm, BaseFormData } from "./BaseForm";
import { BaseClass, MagicSchool, Source, SubClass } from "@prisma/client";
import { redirect } from "next/navigation";
import { apiPost } from "@/utils/apiUtils";
import { Check } from "lucide-react";

interface SpellFormProps {
  source: Source & {
    schools: MagicSchool[];
    baseClasses: BaseClass[];
    subClasses: SubClass[];
  };
  level: number;
}

function SpellForm({ source, level }: SpellFormProps) {
  const [error, setError] = useState<string | null | undefined>(null);
  const [selectedClasses, setSelectedClasses] = useState<BaseClass[]>([]);
  const [selectedSubClasses, setSelectedSubClasses] = useState<SubClass[]>([]);

  const submitSpellForm = (data: BaseFormData) => {
    // console.log(data);
    apiPost("/api/spells/new", data).then(({ response, data }) => {
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

  const toggleClass = (baseClass: BaseClass) => {
    if (selectedClasses.includes(baseClass)) {
      setSelectedClasses(selectedClasses.filter((c) => c.id !== baseClass.id));
      setSelectedSubClasses(
        selectedSubClasses.filter(
          (subClass) => subClass.baseClassId !== baseClass.id,
        ),
      );
    } else {
      setSelectedClasses([...selectedClasses, baseClass]);
    }
  };

  const classOptions = source.baseClasses.map((baseClass, index) => (
    <div
      key={index}
      className={`rounded-full px-3 py-1 ${selectedClasses.includes(baseClass) ? "bg-red-800" : "bg-stone-950"}`}
      onClick={() => toggleClass(baseClass)}
    >
      {baseClass.name}
    </div>
  ));

  const clearSelectedSubClasses = (baseClass: BaseClass) => {
    setSelectedSubClasses(
      selectedSubClasses.filter(
        (subClass) => subClass.baseClassId !== baseClass.id,
      ),
    );
  };

  const toggleSubClass = (subClass: SubClass) => {
    if (selectedSubClasses.includes(subClass)) {
      setSelectedSubClasses(
        selectedSubClasses.filter((c) => c.id !== subClass.id),
      );
    } else {
      setSelectedSubClasses([...selectedSubClasses, subClass]);
    }
  };

  const subClassOptions = selectedClasses.map((baseClass, index) => (
    <div key={index}>
      <h5>{baseClass.name} subclasses</h5>
      <div className="flex flex-nowrap gap-2 overflow-x-auto py-2">
        <div
          onClick={() => clearSelectedSubClasses(baseClass)}
          className={`${selectedSubClasses.some((subClass) => subClass.baseClassId === baseClass.id) ? "bg-stone-950" : "bg-red-800"} rounded-full px-3 py-1`}
        >
          All
        </div>
        {source.subClasses
          .filter((subClass) => subClass.baseClassId === baseClass.id)
          .map((subClass, index) => (
            <div
              key={index}
              className={`rounded-full px-3 py-1 ${selectedSubClasses.includes(subClass) ? "bg-red-800" : "bg-stone-950"}`}
              onClick={() => toggleSubClass(subClass)}
            >
              {subClass.name}
            </div>
          ))}
      </div>
    </div>
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
      <div>
        <h5>Classes</h5>
        <div className="disable-scrollbars flex flex-nowrap gap-2 overflow-x-auto py-2">
          {classOptions}
        </div>
      </div>
      {subClassOptions}
      <input
        hidden
        readOnly
        type="text"
        name="classes"
        value={
          selectedClasses &&
          selectedClasses.map((baseClass) => baseClass.id).join(",")
        }
      />
      <input
        hidden
        readOnly
        type="text"
        name="subclasses"
        value={
          selectedSubClasses &&
          selectedSubClasses.map((subClass) => subClass.id).join(",")
        }
      />
      <input hidden readOnly type="text" name="sourceId" value={source.id} />
    </BaseForm>
  );
}

export default SpellForm;
