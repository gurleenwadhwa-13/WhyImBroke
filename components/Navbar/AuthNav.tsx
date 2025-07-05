// components/AuthNav.tsx

"use client";

import Link from "next/link";
import { LayoutDashboardIcon, PenBox } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

export default function AuthNav() {
  return (
    <nav className="flex items-center gap-3 sm:gap-4">
      {/* Dashboard Link */}
      <Link href="/dashboard">
        <Button variant="outline" className="flex items-center gap-2 px-3">
          <LayoutDashboardIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Button>
      </Link>

      {/* Add Transaction Link */}
      <Link href="/transactions/create">
        <Button className="flex items-center gap-2 px-3">
          <PenBox className="w-4 h-4" />
          <span className="hidden sm:inline">Add Transactions</span>
        </Button>
      </Link>

      {/* User Profile */}
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-11 h-11",
          },
        }}
        afterSignOutUrl="/"
      />
    </nav>
  );
}
