import { BaseClass, Source, SubClass } from "@prisma/client";
import Link from "next/link";
import React from "react";

function SourceClasses({
  source,
}: Readonly<{
  source: Source & {
    baseClasses: BaseClass[];
    subClasses: SubClass[];
  };
}>) {
  const baseClassCell = (baseClass: BaseClass, index: number) => (
    <Link
      href={`/source/${source.slug}/classes/${baseClass.slug}`}
      key={index}
      className="primary-button"
    >
      <p>{baseClass.name}</p>
    </Link>
  );

  const classesSection = (
    <div className="flex flex-col gap-2">
      <h4 className="">Classes</h4>
      <div className="flex flex-col gap-2">
        {source.baseClasses.length > 0 ? (
          source.baseClasses.map((baseClass, index) =>
            baseClassCell(baseClass, index),
          )
        ) : (
          <>
            <div className="text-center opacity-50">No classes yet</div>
            <Link
              href={`/source/${source.slug}/new/class`}
              className="primary-button self-center"
            >
              Create new class
            </Link>
          </>
        )}
      </div>
    </div>
  );

  const subClassCell = (subClass: SubClass, index: number) => (
    <Link
      href={`/source/${source.slug}/subclasses/${subClass.slug}`}
      key={index}
      className="primary-button"
    >
      <p>
        {subClass.name} (
        {
          source.baseClasses.find(
            (baseClass) => baseClass.id === subClass.baseClassId,
          )?.name
        }
        )
      </p>
    </Link>
  );

  const subClassesSection = (
    <div className="flex flex-col gap-2">
      <h4 className="">Subclasses</h4>
      <div className="flex flex-col gap-2">
        {source.subClasses.length > 0 ? (
          source.subClasses.map((subClass, index) =>
            subClassCell(subClass, index),
          )
        ) : (
          <>
            <div className="text-center opacity-50">No subclasses yet</div>
            <Link
              href={`/source/${source.slug}/new/subclass`}
              className="primary-button self-center"
            >
              Create new subclass
            </Link>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      {classesSection}
      {subClassesSection}
    </div>
  );
}

export default SourceClasses;
