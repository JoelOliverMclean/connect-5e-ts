"use client";
import type {
  Ammunition,
  Armor,
  BaseClass,
  MagicSchool,
  Race,
  Source,
  Spell,
  SubClass,
  SubRace,
  Weapon,
} from "@prisma/client";
import React, { useState } from "react";
import SourceRaces from "./tabs/SourceRaces";
import TabNavigation from "../navigation/TabNavigation";
import SourceClasses from "./tabs/SourceClasses";
import SourceSpells from "./tabs/SourceSpells";
import SourceWeapons from "./tabs/SourceWeapons";
import SourceAmmunition from "./tabs/SourceAmmunition";
import SourceArmor from "./tabs/SourceArmor";

function SourceTabNavigation({
  source,
}: Readonly<{
  source: Source & {
    races: Race[];
    subRaces: SubRace[];
    baseClasses: BaseClass[];
    subClasses: SubClass[];
    spells: Spell[];
    schools: MagicSchool[];
    weapons: Weapon[];
    ammunitions: Ammunition[];
    armors: Armor[];
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
      <div className="bg-red-800">
        <TabNavigation tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      </div>
      {tab === "Races" && <SourceRaces source={source} />}
      {tab === "Classes" && <SourceClasses source={source} />}
      {tab === "Spells" && <SourceSpells source={source} />}
      {tab === "Weapons" && <SourceWeapons source={source} />}
      {tab === "Ammunitions" && <SourceAmmunition source={source} />}
      {tab === "Armor" && <SourceArmor source={source} />}
    </>
  );
}

export default SourceTabNavigation;
