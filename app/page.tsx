import HomeCampaigns from "@/components/home/HomeCampaigns";
import HomeCharacters from "@/components/home/HomeCharacters";
import HomeProfile from "@/components/home/HomeProfile";
import HomeSources from "@/components/home/HomeSources";
import { currentUser } from "@clerk/nextjs/server";
import { type Source } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const user = await currentUser();
  const profile = await prisma.profile.findFirst({
    where: {
      authId: {
        equals: user?.id,
      },
    },
  });

  const characters = !profile
    ? []
    : await prisma.character.findMany({
        where: {
          profileId: {
            equals: profile.id,
          },
        },
      });

  const campaigns = !profile
    ? []
    : await prisma.campaign.findMany({
        where: {
          ownerProfileId: {
            equals: profile.id,
          },
        },
      });

  const sources = !profile
    ? []
    : await prisma.source.findMany({
        where: {
          ownerProfileId: {
            equals: profile.id,
          },
        },
      });

  return (
    <div className="flex flex-col gap-4 p-4">
      {profile && (
        <>
          <HomeCharacters characters={characters} />
          <HomeCampaigns campaigns={campaigns} />
          <HomeSources sources={sources} />
        </>
      )}
      <HomeProfile profile={profile} />
    </div>
  );
}
