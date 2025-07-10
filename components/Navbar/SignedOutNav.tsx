"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Star, Moon } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
]

// ✅ Feature flag: toggle auth buttons for staging/dev only
const SHOW_AUTH_BUTTONS = false;

export default function SignedOutNav() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 nav-blur"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Nav Items */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-white flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">$</span>
              </div>
              <span>WhyImBroke</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-gray-300 hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Moon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Github className="w-4 h-4 mr-2" />
              <Star className="w-4 h-4 mr-1" />
              Star on GitHub
            </Button>
            {SHOW_AUTH_BUTTONS && (
              <>
                <SignInButton forceRedirectUrl="/dashboard">
                  <Button variant="outline">Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Sign Up</Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
