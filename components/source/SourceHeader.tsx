import type { Source } from "@prisma/client";
import Link from "next/link";
import React, { ReactNode } from "react";

function SourceHeader({
  children,
  source,
}: Readonly<{
  children?: ReactNode;
  source: Source;
}>) {
  return (
    <div className={`flex flex-col gap-2 bg-red-800 p-4`}>
      <Link href={`/source/${source.slug}`}>
        <div>
          <p>Source</p>
          <h4>{source?.name}</h4>
        </div>
      </Link>
      {children}
    </div>
  );
}

export default SourceHeader;
