"use client";
import React, { useState } from "react";

function TabNavigation({
  tabs,
  activeTab,
  setActiveTab,
}: Readonly<{
  tabs: string[];
  activeTab: string | null | undefined;
  setActiveTab: (tab: string) => void;
}>) {
  const selectTab = (name: string) => {
    setActiveTab(name);
  };

  const tabElement = (name: string, index: number) => (
    <div
      key={index}
      className={`cursor-pointer rounded-full px-4 py-2 duration-300 ${
        activeTab === name && "bg-red-950"
      }`}
      onClick={() => selectTab(name)}
    >
      {name}
    </div>
  );

  return (
    <>
      <div className="flex gap-2 overflow-x-auto bg-red-800 p-2">
        {tabs.map((tab, index) => tabElement(tab, index))}
      </div>
    </>
  );
}

export default TabNavigation;
