"use client";
import React, { useState } from "react";
import { BaseForm, BaseFormData } from "./BaseForm";
import type { Source } from "@prisma/client";
import { redirect } from "next/navigation";
import Image from "next/image";

const postClass = async (data: BaseFormData) => {
  const response = await fetch("/api/classes/new", {
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

function ClassForm({
  source,
}: Readonly<{
  source: Source;
}>) {
  const hitDiceArray = Array.of("d4", "d6", "d8", "d10", "d12", "d20");

  const [error, setError] = useState<string | null | undefined>(null);
  const [selectedHitDice, setSelectedHitDice] = useState<string>(
    hitDiceArray[0],
  );

  const submitClassForm = (data: BaseFormData) => {
    const postData = {
      ...data,
      sourceId: source.id,
      hitDice: selectedHitDice,
    };
    postClass(postData).then((data) => {
      if (!data.error) {
        setError(null);
        redirect(`/source/${source.slug}/classes/${data.slug}`);
      } else {
        setError(data.error);
      }
    });
  };

  const hitDiceGraphicSection = (
    <>
      <h6>Choose Hit Dice</h6>
      <div className="flex flex-wrap justify-center gap-4 p-2">
        {hitDiceArray.map((hitDice, index) => (
          <div
            className="flex cursor-pointer flex-col gap-1"
            onClick={() => setSelectedHitDice(hitDice)}
          >
            <div
              className={`rounded-full border-2 border-transparent p-2 duration-300 hover:bg-black ${selectedHitDice === hitDice && "border-yellow-600 bg-black"}`}
              key={index}
            >
              <Image
                className="relative"
                src={`/dice/dice-${hitDice}-white.png`}
                width={48}
                height={48}
                alt={`${hitDice} hit dice option icon`}
              />
            </div>
            <p
              className={`text-center duration-300 ${selectedHitDice === hitDice && "text-yellow-500"}`}
            >
              {hitDice}
            </p>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <BaseForm onSubmitData={submitClassForm} error={error}>
      <input type="text" name="name" placeholder="Name of class" />
      <textarea name="description" placeholder="Description of class" />
      {hitDiceGraphicSection}
    </BaseForm>
  );
}

export default ClassForm;
