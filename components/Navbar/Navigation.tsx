"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignedOutNav from "./SignedOutNav";
import SignedInNav from "./SignedInNav";

const Navigation = () => {
  return (
    <>
      <SignedOut>
        <SignedOutNav />
      </SignedOut>
      <SignedIn>
        <SignedInNav />
      </SignedIn>
    </>
  );
};

export default Navigation;