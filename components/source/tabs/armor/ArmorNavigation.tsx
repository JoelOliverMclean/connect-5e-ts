import {
  Armor,
  CharacterAlteration,
  Source,
} from "@prisma/client";
import React from "react";

interface ArmorNavigationProps {
  armor: Armor & {
    source: Source;
    characterAlterations: CharacterAlteration[];
  };
}

function ArmorNavigation({ armor }: ArmorNavigationProps) {
  return <div>ArmorNavigation</div>;
}

export default ArmorNavigation;
