"use client";
import { getFormJson } from "@/utils/formUtils";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";

function SourceForm() {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitSourceForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getFormJson(event);
    fetch("/api/source", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((data) => {
        if (response.status === 200) {
          setError(null);
          redirect(`/source/${data.slug}`);
        } else {
          setError(data.error);
        }
      });
    });
  };

  return (
    <form onSubmit={submitSourceForm}>
      <div className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Source name" />
        <textarea name="description" placeholder="Enter source description" />
        {error && <p className="font-bold text-red-600">{error}</p>}
        <input type="submit" />
      </div>
    </form>
  );
}

export default SourceForm;
