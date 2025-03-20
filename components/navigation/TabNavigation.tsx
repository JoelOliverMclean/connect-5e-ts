"use client";
import React, { useRef } from "react";

function TabNavigation({
  tabs,
  activeTab,
  setActiveTab,
}: Readonly<{
  tabs: string[];
  activeTab: string | null | undefined;
  setActiveTab: (tab: string) => void;
}>) {
  const navBarRef = useRef<HTMLDivElement>(null);
  const selectTab = (name: string, index: number) => {
    const tabRef = navBarRef.current?.children[index] as
      | HTMLElement
      | undefined;

    if (tabRef && navBarRef.current) {
      const containerWidth = navBarRef.current.offsetWidth;
      const tabWidth = tabRef.offsetWidth;

      const scrollLeft = tabRef.offsetLeft - containerWidth / 2 + tabWidth / 2;

      navBarRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }

    setActiveTab(name);
  };

  const tabElement = (name: string, index: number) => (
    <div
      key={index}
      className={`cursor-pointer rounded-full px-4 py-2 whitespace-nowrap duration-300 ${
        activeTab === name && "bg-red-950"
      }`}
      onClick={() => selectTab(name, index)}
    >
      {name}
    </div>
  );

  return (
    <>
      <div
        ref={navBarRef}
        className="disable-scrollbars flex gap-2 overflow-x-auto p-2"
      >
        {tabs.map((tab, index) => tabElement(tab, index))}
      </div>
    </>
  );
}

export default TabNavigation;
