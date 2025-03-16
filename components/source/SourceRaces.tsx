import type { Source, Race, SubRace } from "@prisma/client";
import Link from "next/link";
import React from "react";

function SourceRaces({
  source,
}: Readonly<{
  source: Source & {
    races: Race[];
    subRaces: SubRace[];
  };
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

  const raceSection = (
    <div className="flex flex-col gap-2">
      <h4 className="">Races</h4>
      <div className="flex flex-col gap-2">
        {source.races.length > 0 ? (
          source.races.map((race, index) => raceCell(race, index))
        ) : (
          <>
            <div className="text-center opacity-50">No races yet</div>
            <Link
              href={`/source/${source.slug}/new/race`}
              className="primary-button self-center"
            >
              Create new race
            </Link>
          </>
        )}
      </div>
    </div>
  );

  const subRaceCell = (subRace: SubRace, index: number) => (
    <Link
      href={`/source/${source.slug}/subraces/${subRace.slug}`}
      key={index}
      className="primary-button"
    >
      <p>
        {subRace.name} (
        {source.races.find((race) => race.id === subRace.raceId)?.name})
      </p>
    </Link>
  );

  const subRaceSection = (
    <div className="flex flex-col gap-2">
      <h4 className="">Subraces</h4>
      <div className="flex flex-col gap-2">
        {source.subRaces.length > 0 ? (
          source.subRaces.map((subRace, index) => subRaceCell(subRace, index))
        ) : (
          <>
            <div className="text-center opacity-50">No sub-races yet</div>
            <Link
              href={`/source/${source.slug}/new/subrace`}
              className="primary-button self-center"
            >
              Create new subrace
            </Link>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      {raceSection}
      {subRaceSection}
    </div>
  );
}

export default SourceRaces;
