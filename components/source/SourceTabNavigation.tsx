"use client";
import type { Race, Source, SubRace } from "@prisma/client";
import React, { useState } from "react";
import SourceRaces from "./SourceRaces";
import TabNavigation from "../navigation/TabNavigation";

function SourceTabNavigation({
  source,
}: Readonly<{
  source: Source & {
    races: Race[];
    subRaces: SubRace[];
  };
}>) {
  const tabs = [
    "Races",
    "Classes",
    "Spells",
    "Weapons",
    "Ammunitions",
    "Armor",
    "Items",
    "Conditions",
    "Languages",
    "Currencies",
  ];
  const [tab, setTab] = useState<string | null | undefined>(tabs[0]);

  const raceTab = (
    <div className="flex flex-col gap-4 p-4">
      <SourceRaces source={source} />
    </div>
  );

  return (
    <>
      <TabNavigation tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      {tab === "Races" && raceTab}
    </>
  );
}

export default SourceTabNavigation;
