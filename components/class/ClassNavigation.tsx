"use client";
import type {
  BaseClass,
  CharacterAlteration,
  ClassFeature,
  Source,
  SubClass,
} from "@prisma/client";
import React, { useState } from "react";
import TabNavigation from "../navigation/TabNavigation";
import Link from "next/link";

export function ClassNavigation({
  baseClass,
}: Readonly<{
  baseClass: BaseClass & {
    source: Source;
    subClasses: SubClass[];
    features: ClassFeature[];
    characterAlterations: CharacterAlteration[];
  };
}>) {
  const tabs = ["About", "Subclasses", "Features", "Alterations"];
  const [tab, setTab] = useState<string | null | undefined>(tabs[0]);

  const aboutTab = (
    <div className="flex flex-col p-4">{baseClass.description}</div>
  );

  const subClassCell = (subClass: SubClass, index: number) => (
    <Link
      href={`/source/${baseClass.source.slug}/subclasses/${subClass.slug}`}
      key={index}
      className="primary-button"
    >
      {subClass.name}
    </Link>
  );

  const subClassesTab = (
    <div className="flex flex-col gap-4 p-4">
      {baseClass.subClasses.length > 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {baseClass.subClasses.map((subClass, index) =>
            subClassCell(subClass, index),
          )}
        </div>
      ) : (
        <>
          <div className="text-center opacity-50">No subclasses yet</div>
          <Link
            href={`/source/${baseClass.source.slug}/new/subclass`}
            className="primary-button self-center"
          >
            Create new subclass
          </Link>
        </>
      )}
    </div>
  );

  return (
    <>
      <TabNavigation tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      {tab === "About" && aboutTab}
      {tab === "Subclasses" && subClassesTab}
    </>
  );
}
