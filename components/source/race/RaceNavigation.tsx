"use client";
import type { Race, Source, SubRace } from "@prisma/client";
import React, { useState } from "react";
import TabNavigation from "../../navigation/TabNavigation";
import Link from "next/link";

export function RaceNavigation({
  race,
}: Readonly<{
  race: Race & {
    source: Source;
    subRaces: SubRace[];
  };
}>) {
  const tabs = ["About", "Subraces", "Features", "Traits"];
  const [tab, setTab] = useState<string | null | undefined>(tabs[0]);

  const aboutTab = <div className="flex flex-col p-4">{race.description}</div>;

  const subraceCell = (subrace: SubRace, index: number) => (
    <Link
      href={`/source/${race.source.slug}/subraces/${subrace.slug}`}
      key={index}
      className="primary-button"
    >
      {subrace.name}
    </Link>
  );

  const subracesTab = (
    <div className="flex flex-col gap-4 p-4">
      {race.subRaces.length > 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {race.subRaces.map((subrace, index) => subraceCell(subrace, index))}
        </div>
      ) : (
        <>
          <div className="text-center opacity-50">No sub-races yet</div>
          <Link
            href={`/source/${race.source.slug}/new/subrace`}
            className="primary-button self-center"
          >
            Create new subrace
          </Link>
        </>
      )}
    </div>
  );

  return (
    <>
      <TabNavigation tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      {tab === "About" && aboutTab}
      {tab === "Subraces" && subracesTab}
    </>
  );
}
