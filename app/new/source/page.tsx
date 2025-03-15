import SourceForm from "@/components/forms/SourceForm";
import React from "react";

function NewSourcePage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h4>Create new source</h4>
      <SourceForm />
    </div>
  );
}

export default NewSourcePage;
