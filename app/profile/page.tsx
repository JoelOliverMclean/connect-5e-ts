import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const profile = await prisma.profile.findFirst({
    where: {
      authId: {
        equals: user?.id,
      },
    },
  });

  if (!profile) {
    redirect("/profile/create");
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3>{user?.firstName}'s Profile</h3>
      <p>
        <span className="font-bold pe-2">Display Name:</span>
        {profile?.displayName}
      </p>
    </div>
  );
}

export default ProfilePage;
