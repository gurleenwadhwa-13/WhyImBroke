"use client"

import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { LayoutDashboardIcon, PenBox, Github, Star, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignedInNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="text-xl font-bold text-white flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">$</span>
            </div>
            <span>WhyImBroke</span>
          </Link>

          {/* Authenticated Actions */}
          <div className="flex items-center space-x-4">
            {/* <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Moon className="w-4 h-4" />
            </Button> */}
            <Link href="/dashboard">
              <Button variant="outline" className="flex items-center gap-2 px-3">
                <LayoutDashboardIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/transactions/create">
              <Button className="flex items-center gap-2 px-3">
                <PenBox className="w-4 h-4" />
                <span className="hidden sm:inline">Add Transaction</span>
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-11 h-11",
                },
              }}
              afterSignOutUrl="/"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
