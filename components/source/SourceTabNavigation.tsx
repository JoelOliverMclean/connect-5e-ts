"use client";
import type {
  Ammunition,
  Armor,
  BaseClass,
  Condition,
  Currency,
  Item,
  Language,
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
import SourceItems from "./tabs/SourceItems";
import SourceConditions from "./tabs/SourceConditions";
import SourceLanguages from "./tabs/SourceLanguages";
import SourceCurrencies from "./tabs/SourceCurrencies";

enum SourceTab {
  RACES,
  CLASSES,
  SPELLS,
  WEAPONS,
  AMMUNITIONS,
  ARMOR,
  ITEMS,
  CONDITIONS,
  LANGUAGES,
  CURRENCIES
}

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
    items: Item[];
    conditions: Condition[];
    languages: Language[];
    currencies: Currency[];
  };
}>) {
  const tabs = Object.keys(SourceTab).filter((item) => { 
    return isNaN(Number(item));
  })
  
  const [tab, setTab] = useState<string | null | undefined>(SourceTab[SourceTab.RACES]);

  return (
    <>
      <div className="bg-red-800">
        <TabNavigation tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      </div>
      {tab === SourceTab[SourceTab.RACES] && <SourceRaces source={source} />}
      {tab === SourceTab[SourceTab.CLASSES] && <SourceClasses source={source} />}
      {tab === SourceTab[SourceTab.SPELLS]&& <SourceSpells source={source} />}
      {tab === SourceTab[SourceTab.WEAPONS] && <SourceWeapons source={source} />}
      {tab === SourceTab[SourceTab.AMMUNITIONS] && <SourceAmmunition source={source} />}
      {tab === SourceTab[SourceTab.ARMOR] && <SourceArmor source={source} />}
      {tab === SourceTab[SourceTab.ITEMS] && <SourceItems source={source} />}
      {tab === SourceTab[SourceTab.CONDITIONS] && <SourceConditions source={source} />}
      {tab === SourceTab[SourceTab.LANGUAGES] && <SourceLanguages source={source} />}
      {tab === SourceTab[SourceTab.CURRENCIES] && <SourceCurrencies source={source} />}
    </>
  );
}

export default SourceTabNavigation;
