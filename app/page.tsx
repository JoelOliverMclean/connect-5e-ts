import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function Home() {
  const user = await currentUser();
  const profile = await prisma.profile.findFirst({
    where: {
      authId: {
        equals: user?.id,
      },
    },
  });

  const myCharacters = (
    <div className="flex flex-col gap-2">
      <h5 className="text-red-700">My Characters</h5>
      <div className="opacity-50">None yet</div>
    </div>
  );

  const myCampaigns = (
    <div className="flex flex-col gap-2">
      <h5 className="text-red-700">My Campaigns</h5>
      <div className="opacity-50">None yet</div>
    </div>
  );

  const myProfile = (
    <div className="flex flex-col gap-2 ">
      <h5 className="text-red-700">My Profile</h5>
      <div className="">
        <span className="font-bold pe-2">Display Name:</span>
        {profile?.displayName}
      </div>
    </div>
  );

  const createProfile = (
    <div className="flex flex-col gap-2">
      <h5>Get Started</h5>
      <p>Create a profile to begin adventuring!</p>
      <Link className="primary-button" href={"/profile/create"}>
        Create Profile
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <h4 className="">
        Welcome back{user?.firstName && `, ${user?.firstName}`}
      </h4>
      <hr />
      {profile ? (
        <>
          {myCharacters}
          {myCampaigns}
          {myProfile}
        </>
      ) : (
        <>{createProfile}</>
      )}
    </div>
  );
}
