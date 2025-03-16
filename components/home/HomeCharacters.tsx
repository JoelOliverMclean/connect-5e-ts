import { type Character } from "@prisma/client";
import React from "react";

function HomeCharacters({
  characters,
}: Readonly<{
  characters: Character[];
}>) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="">My Characters</h4>
      <div className="opacity-50">None yet</div>
    </div>
  );
}

export default HomeCharacters;
