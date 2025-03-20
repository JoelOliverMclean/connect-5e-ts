"use client";
import TabNavigation from "@/components/navigation/TabNavigation";
import { MagicSchool, Spell } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

interface SpellsNavigationProps {
  sourceSlug: string;
  spells: Spell[];
  schools: MagicSchool[];
}

function SpellsNavigation(props: SpellsNavigationProps) {
  const tabs = Array.of(
    "Cantrips",
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
    "Level 6",
    "Level 7",
    "Level 8",
    "Level 9",
  );

  const [activeTab, setActiveTab] = useState<string>(tabs[0] ?? null);

  const spellList = (level: number) => {
    const spells = props.spells.filter((spell) => spell.level === level);
    if (spells.length <= 0) {
      return (
        <div className="flex flex-col items-center gap-4">
          <p className="opacity-50">
            No {level === 0 ? "cantrips" : `level ${level} spells`} yet
          </p>
          <Link
            className="primary-button"
            href={`/source/${props.sourceSlug}/new/spell?level=${level}`}
          >
            Add a {level === 0 ? "cantrip" : `level ${level} spell`}
          </Link>
        </div>
      );
    }
    return spells.map((spell, index) => (
      <div
        className="rounded-lg border-1 border-yellow-500 bg-stone-950 p-2 shadow-md shadow-black"
        key={index}
      >
        <h6 className="">{spell.name}</h6>
        <p className="text-sm">
          {props.schools.find((school) => school.id === spell.schoolId)?.name}
        </p>
      </div>
    ));
  };

  return (
    <>
      <div>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 overflow-y-auto p-4">
        {spellList(tabs.indexOf(activeTab))}
      </div>
    </>
  );
}

export default SpellsNavigation;
