"use client";
import type { BaseClass, Source, SubClass } from "@prisma/client";
import React, { useState } from "react";
import TabNavigation from "../../navigation/TabNavigation";
import Link from "next/link";

export function SubclassNavigation({
  subclass,
}: Readonly<{
  subclass: SubClass & {
    source: Source;
    baseClass: BaseClass;
  };
}>) {
  const tabs = ["About", "Features", "Alterations"];
  const [tab, setTab] = useState<string | null | undefined>(tabs[0]);

  const aboutTab = (
    <div className="flex flex-col p-4">{subclass.description}</div>
  );

  return (
    <>
      <TabNavigation tabs={tabs} activeTab={tab} setActiveTab={setTab} />
      {tab === "About" && aboutTab}
    </>
  );
}
