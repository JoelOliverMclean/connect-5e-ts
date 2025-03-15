import type { Source } from "@prisma/client";
import Link from "next/link";
import React from "react";

function SourceHeader({
  source,
}: Readonly<{
  source: Source;
}>) {
  return (
    <div className="flex bg-red-800 p-4">
      <Link href={`/source/${source.slug}`}>
        <p>Source</p>
        <h4>{source?.name}</h4>
      </Link>
    </div>
  );
}

export default SourceHeader;
