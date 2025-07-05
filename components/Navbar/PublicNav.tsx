// components/PublicNav.tsx

"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function PublicNav() {
  return (
    <nav className="flex items-center gap-3 sm:gap-4">
      <SignInButton forceRedirectUrl="/dashboard">
        <Button variant="outline">Login</Button>
      </SignInButton>
      <SignUpButton>
        <Button>Sign Up</Button>
      </SignUpButton>
    </nav>
  );
}
