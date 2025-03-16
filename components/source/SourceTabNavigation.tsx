"use client";
import type {
  BaseClass,
  Race,
  Source,
  SubClass,
  SubRace,
} from "@prisma/client";
import React, { useState } from "react";
import SourceRaces from "./SourceRaces";
import TabNavigation from "../navigation/TabNavigation";
import SourceClasses from "./SourceClasses";

function SourceTabNavigation({
  source,
}: Readonly<{
  source: Source & {
    races: Race[];
    subRaces: SubRace[];
    baseClasses: BaseClass[];
    subClasses: SubClass[];
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

  return (
    <>
      <TabNavigation tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      {tab === "Races" && <SourceRaces source={source} />}
      {tab === "Classes" && <SourceClasses source={source} />}
    </>
  );
}

export default SourceTabNavigation;
