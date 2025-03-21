import {
  Ammunition,
  CharacterAlteration,
  Source,
  Weapon,
  WeaponDamage,
  WeaponPropertiesOnWeapon,
} from "@prisma/client";
import React from "react";

interface WeaponNavigationProps {
  weapon: Weapon & {
    source: Source;
    ammunition: Ammunition | null | undefined;
    damages: WeaponDamage[];
    properties: WeaponPropertiesOnWeapon[];
    characterAlterations: CharacterAlteration[];
  };
}

function WeaponNavigation({ weapon }: WeaponNavigationProps) {
  return <div>WeaponNavigation</div>;
}

export default WeaponNavigation;
