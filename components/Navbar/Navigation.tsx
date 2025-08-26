"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignedOutNav from "./SignedOutNav";
import AuthenticatedLayout from "../AuthenticatedLayout/authenticatedLayout";
import { Toaster } from "@/components/ui/sonner"

const Navigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedOut>
        <SignedOutNav />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
      </SignedOut>

      <SignedIn>
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
        <Toaster richColors />
      </SignedIn>
    </>
  );
};

export default Navigation;