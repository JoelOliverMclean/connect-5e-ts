import { type Source } from "@prisma/client";
import Link from "next/link";
import React from "react";

async function HomeSources({
  sources,
}: Readonly<{
  sources: Source[];
}>) {
  const sourceCell = (source: Source, index: number) => (
    <Link
      href={`/source/${source.slug}`}
      key={index}
      className="primary-button"
    >
      <p>{source.name}</p>
    </Link>
  );

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-red-600">My Sources</h4>
      <div className="flex flex-col gap-2">
        {sources.length > 0 ? (
          sources.map((source, index) => sourceCell(source, index))
        ) : (
          <>
            <div className="text-center opacity-50">No sources yet</div>
            <Link href="/new/source" className="primary-button self-center">
              Create new source
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeSources;
