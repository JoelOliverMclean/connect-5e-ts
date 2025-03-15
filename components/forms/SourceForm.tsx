"use client";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { BaseFormData, BaseForm } from "./BaseForm";

function SourceForm() {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitSourceForm = (data: BaseFormData) => {
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
    <BaseForm onSubmitData={submitSourceForm} error={error}>
      <input type="text" name="name" placeholder="Source name" />
      <textarea name="description" placeholder="Enter source description" />
    </BaseForm>
  );
}

export default SourceForm;
