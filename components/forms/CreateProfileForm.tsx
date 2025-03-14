"use client";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";

function CreateProfileForm() {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitProfileForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    fetch("/api/profile/create", {
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
          redirect("/profile");
        } else {
          setError(data.error);
        }
      });
    });
  };

  return (
    <form
      onSubmit={(e) => {
        "use client";
        submitProfileForm(e);
      }}
    >
      <div className="flex flex-col gap-4">
        <input type="text" name="displayName" placeholder="Display name" />
        {error && <p className="text-red-600 font-bold">{error}</p>}
        <input type="submit" />
      </div>
    </form>
  );
}

export default CreateProfileForm;
