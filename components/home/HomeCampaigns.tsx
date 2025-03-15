import { type Campaign } from "@prisma/client";
import React from "react";

function HomeCampaigns({
  campaigns,
}: Readonly<{
  campaigns: Campaign[];
}>) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-red-600">My Campaigns</h4>
      <div className="opacity-50">None yet</div>
    </div>
  );
}

export default HomeCampaigns;
