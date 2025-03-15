import { type SubRace } from "@prisma/client";
import Link from "next/link";
import React from "react";

function SourceSubRaces({
  subRaces,
}: Readonly<{
  subRaces: SubRace[];
}>) {
  const subRaceCell = (subRace: SubRace, index: number) => (
    <div key={index} className="primary-button">
      <p>{subRace.name}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-red-600">Sub-Races</h4>
      <div className="flex flex-col gap-2">
        {subRaces.length > 0 ? (
          subRaces.map((subRace, index) => subRaceCell(subRace, index))
        ) : (
          <>
            <div className="text-center opacity-50">No sub-races yet</div>
            <Link href="/new/source" className="primary-button self-center">
              Create new race
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default SourceSubRaces;
