"use client";
import { Race, Source, SubRace } from "@prisma/client";
import React, { useState } from "react";
import SourceRaces from "./SourceRaces";
import SourceSubRaces from "./SourceSubraces";

function SourceTabNavigation({
  races,
  subRaces,
}: Readonly<{
  races: Race[];
  subRaces: SubRace[];
}>) {
  const [tab, setTab] = useState<string | null | undefined>("races");

  const selectTab = (name: string) => {
    setTab(name);
  };

  const tabElement = (name: string) => (
    <div
      className={`rounded-full px-4 py-2 ${
        tab === name.toLowerCase() && "bg-red-950"
      }`}
      onClick={() => selectTab(name.toLowerCase())}
    >
      {name}
    </div>
  );

  return (
    <>
      <div className="flex gap-2 overflow-x-auto bg-red-800 p-2">
        {tabElement("Races")}
        {tabElement("Classes")}
        {tabElement("Spells")}
        {tabElement("Weapons")}
        {tabElement("Ammunitions")}
        {tabElement("Armor")}
        {tabElement("Items")}
        {tabElement("Conditions")}
        {tabElement("Languages")}
        {tabElement("Currencies")}
      </div>
      <div className="flex flex-col gap-4 p-4">
        <SourceRaces races={races} />
        <SourceSubRaces subRaces={subRaces} />
      </div>
    </>
  );
}

export default SourceTabNavigation;
