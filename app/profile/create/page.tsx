import React, { FormEvent, FormEventHandler, ReactElement } from "react";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateProfileForm from "@/components/forms/CreateProfileForm";

const prisma = new PrismaClient();

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
      <CreateProfileForm />
    </div>
  );
}

export default CreateProfilePage;
