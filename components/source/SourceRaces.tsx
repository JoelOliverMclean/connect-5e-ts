import type { Source, Race } from "@prisma/client";
import Link from "next/link";
import React from "react";

function SourceRaces({
  source,
  races,
}: Readonly<{
  source: Source;
  races: Race[];
}>) {
  const raceCell = (race: Race, index: number) => (
    <Link
      href={`/source/${source.slug}/races/${race.slug}`}
      key={index}
      className="primary-button"
    >
      <p>{race.name}</p>
    </Link>
  );

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-red-600">Races</h4>
      <div className="flex flex-col gap-2">
        {races.length > 0 ? (
          races.map((race, index) => raceCell(race, index))
        ) : (
          <>
            <div className="text-center opacity-50">No races yet</div>
            <Link
              href={`/source/${source.slug}/races/new`}
              className="primary-button self-center"
            >
              Create new race
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default SourceRaces;
