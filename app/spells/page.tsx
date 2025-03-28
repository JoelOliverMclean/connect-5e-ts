"use client";
import Popup from "@/components/popup/Popup";
import { jsonSpellData, type Spell } from "@/spells";
import { X } from "lucide-react";

import React, { useState } from "react";

function AllSpellsPage() {
  const [classes, setClasses] = useState<string[]>(["Druid"]);
  const [levels, setLevels] = useState<string[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  const spellCard = (spell: Spell, index: number, showDesc: Boolean) => (
    <div
      key={index}
      className="flex max-w-md flex-col gap-2 rounded-lg bg-green-800 p-2"
      onClick={(e) => {
        if (!showDesc) {
          setSelectedSpell(spell);
        }
      }}
    >
      {showDesc && (
        <div className="flex justify-end">
          <div
            className="cursor-pointer p-1"
            onClick={(e) => setSelectedSpell(null)}
          >
            <X size={32} />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 overflow-clip rounded-lg">
        <h6 className="bg-background p-1 text-center">{spell.name}</h6>
        <div className="grid grid-cols-2 gap-1 text-center text-sm">
          <div className="bg-background flex flex-col items-center justify-start p-1">
            <p className="font-bold text-green-500">Casting Time</p>
            <p>{spell.casting_time}</p>
          </div>
          <div className="bg-background flex flex-col items-center justify-start p-1">
            <p className="font-bold text-green-500">Range</p>
            <p>{spell.range}</p>
          </div>
          <div className="bg-background flex flex-col items-center justify-start p-1">
            <p className="font-bold text-green-500">Components</p>
            <p>{spell.components}</p>
          </div>
          <div className="bg-background flex flex-col items-center justify-start p-1">
            <p className="font-bold text-green-500">Duration</p>
            <p>
              {spell.concentration && "Concentration, "}
              {spell.duration}
            </p>
          </div>
        </div>
        {showDesc && (
          <>
            {spell.material && <p className="px-1">{spell.material}</p>}
            <div
              className="bg-background p-2 text-sm"
              dangerouslySetInnerHTML={{ __html: spell.desc }}
            ></div>
          </>
        )}
      </div>
      <div className="flex justify-end">
        <p className="text-xs">
          {spell.level === "Cantrip"
            ? `${spell.school} ${spell.level}`
            : `${spell.level} ${spell.school}`}
        </p>
      </div>
    </div>
  );

  const spellPopup = (
    <Popup onDismiss={(e) => setSelectedSpell(null)}>
      {selectedSpell && spellCard(selectedSpell, 0, true)}
    </Popup>
  );

  const tapClassOption = (className: string) => {
    if (classes.includes(className)) {
      setClasses(classes.filter((c) => c !== className));
    } else {
      setClasses([...classes, className]);
    }
  };

  const classOptions = Array.of(
    "Artificer",
    "Bard",
    "Cleric",
    "Druid",
    "Paladin",
    "Ranger",
    "Warlock",
    "Wizard",
  ).map((clazz, index) => (
    <div
      className={`rounded-full ${classes.includes(clazz) ? "bg-red-700" : "bg-stone-700"} p-1 px-2 whitespace-nowrap`}
      key={index}
      onClick={(e) => tapClassOption(clazz)}
    >
      {clazz}
    </div>
  ));

  const tapLevelOption = (level: string) => {
    if (levels.includes(level)) {
      setLevels(levels.filter((l) => l !== level));
    } else {
      setLevels([...levels, level]);
    }
  };

  const levelOptions = Array.of(
    "Cantrip",
    "1st-level",
    "2nd-level",
    "3rd-level",
    "4th-level",
    "5th-level",
    "6th-level",
    "7th-level",
    "8th-level",
    "9th-level",
  ).map((level, index) => (
    <div
      className={`rounded-full ${levels.includes(level) ? "bg-red-700" : "bg-stone-700"} p-1 px-2 whitespace-nowrap`}
      key={index}
      onClick={(e) => tapLevelOption(level)}
    >
      {level}
    </div>
  ));

  return (
    <div className="flex h-full flex-col">
      <div className="sticky-top grid grid-cols-1 bg-stone-800 py-2 lg:grid-cols-2">
        <div>
          <h6 className="px-2">Classes</h6>
          <div className="disable-scrollbars flex flex-nowrap gap-2 overflow-x-auto p-2 lg:flex-wrap">
            {classOptions}
          </div>
        </div>
        <div>
          <h6 className="px-2">Levels</h6>
          <div className="disable-scrollbars flex flex-nowrap gap-2 overflow-x-auto p-2 lg:flex-wrap">
            {levelOptions}
          </div>
        </div>
      </div>
      <div className="grid flex-grow grid-cols-1 gap-4 overflow-y-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        {jsonSpellData
          .filter((spell) => {
            return (
              (classes.length === 0 ||
                spell.class.split(", ").some((c) => classes.includes(c))) &&
              (levels.length === 0 || levels.includes(spell.level))
            );
          })
          .toSorted((a, b) => {
            // Sort by level, placing "Cantrip" first
            if (a.level === "Cantrip" && b.level !== "Cantrip") return -1;
            if (b.level === "Cantrip" && a.level !== "Cantrip") return 1;

            // If levels are the same, sort alphabetically by name
            if (a.level === b.level) return a.name.localeCompare(b.name);

            // Otherwise, sort levels alphanumerically
            return a.level.localeCompare(b.level, undefined, { numeric: true });
          })
          .map((spell, index) => spellCard(spell, index, false))}
      </div>
      {selectedSpell && spellPopup}
    </div>
  );
}

export default AllSpellsPage;
