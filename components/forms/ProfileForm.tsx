"use client";
import { getFormJson } from "@/utils/formUtils";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";

function ProfileForm() {
  const [error, setError] = useState<string | null | undefined>(null);

  const submitProfileForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = getFormJson(event);
    fetch("/api/profile", {
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
        {error && <p className="font-bold text-red-600">{error}</p>}
        <input type="submit" />
      </div>
    </form>
  );
}

export default ProfileForm;
