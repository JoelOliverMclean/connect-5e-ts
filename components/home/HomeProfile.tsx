import { type Profile } from "@prisma/client";
import Link from "next/link";
import React from "react";

function HomeProfile({
  profile,
}: Readonly<{
  profile: Profile | null | undefined;
}>) {
  if (!profile) {
    return (
      <div className="flex flex-col gap-2">
        <h5>Get Started</h5>
        <p>Create a profile to begin adventuring!</p>
        <Link className="primary-button" href={"/profile/create"}>
          Create Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-red-600">My Profile</h4>
      <div className="">
        <span className="pe-2 font-bold">Display Name:</span>
        {profile?.displayName}
      </div>
    </div>
  );
}

export default HomeProfile;
