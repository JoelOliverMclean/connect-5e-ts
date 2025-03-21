import type { Weapon, Source } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { FilePlus } from "lucide-react";
import TabNavigation from "@/components/navigation/TabNavigation";
import SpellsNavigation from "./spells/SpellsNavigation";

function SourceWeapons({
  source,
}: Readonly<{
  source: Source & {
    weapons: Weapon[];
  };
}>) {
  const weaponCell = (weapon: Weapon, index: number) => (
    <div
      className="rounded-lg border-1 border-yellow-500 shadow-md shadow-black"
      key={index}
    >
      <h6>{weapon.name}</h6>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="">Weapons</h4>
          {source.weapons.length > 0 && (
            <Link href={`/source/${source.slug}/new/weapon`}>
              <FilePlus />
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {source.weapons.length > 0 ? (
            source.weapons.map((weapon, index) => weaponCell(weapon, index))
          ) : (
            <>
              <div className="text-center opacity-50">No weapons yet</div>
              <Link
                href={`/source/${source.slug}/new/weapon`}
                className="primary-button self-center"
              >
                Create new weapon
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SourceWeapons;
