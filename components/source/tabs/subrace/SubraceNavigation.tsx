"use client";
import type { Race, Source, SubRace } from "@prisma/client";
import React, { useState } from "react";
import TabNavigation from "../../../navigation/TabNavigation";
import Link from "next/link";

export function SubraceNavigation({
  subrace,
}: Readonly<{
  subrace: SubRace & {
    source: Source;
    race: Race;
  };
}>) {
  const tabs = ["About", "Features", "Traits"];
  const [tab, setTab] = useState<string | null | undefined>(tabs[0]);

  const aboutTab = (
    <div className="flex flex-col p-4">{subrace.description}</div>
  );

  return (
    <>
      <div className="bg-red-800">
        <TabNavigation tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      </div>
      {tab === "About" && aboutTab}
    </>
  );
}
