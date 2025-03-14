import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  const myCharacters = (
    <div className="flex flex-col gap-2">
      <h5>My Characters</h5>
      <div className="opacity-50">None yet</div>
    </div>
  );
  const myCampaigns = (
    <div className="flex flex-col gap-2">
      <h5>My Campaigns</h5>
      <div className="opacity-50">None yet</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <h4 className="">Welcome back, {user?.firstName}</h4>
      <hr />
      {myCharacters}
      {myCampaigns}
    </div>
  );
}
