import { SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";

function LandingContent() {
  return (
    <div className="flex flex-col p-4 gap-4">
      <h4 className="text-center">
        Connect 5e with your DM and party to play D&D faster and easier than
        ever before
      </h4>
      <div className="flex gap-4">
        <SignInButton />
        <SignUpButton />
      </div>
    </div>
  );
}

export default LandingContent;
