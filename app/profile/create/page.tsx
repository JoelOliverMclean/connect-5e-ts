import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/forms/ProfileForm";
import { prisma } from "@/lib/prisma";

async function CreateProfilePage() {
  const user = await currentUser();
  const profile = await prisma.profile.findFirst({
    where: {
      authId: {
        equals: user?.id,
      },
    },
  });

  if (profile) {
    redirect("/profile");
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h4>Create your profile</h4>
      <ProfileForm />
    </div>
  );
}

export default CreateProfilePage;
