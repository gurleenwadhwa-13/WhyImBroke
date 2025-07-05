import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import Image from "next/image";
import AuthNav from "@/components/Navbar/AuthNav";
import PublicNav from "@/components/Navbar/PublicNav";

export const metadata: Metadata = {
  title: "Broke Grad",
  description: "AI Expense Manager for Students",
};

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} >
      <html lang="en" className="overflow-y-scroll">
        <body className={`${inter.className}`}>
          {/** Header Starts */}
          <header className="fixed inset-x-0 top-0 z-50 h-26 bg-white/80 backdrop-blur-md border-b">
            <div className="mx-auto max-w-screen-xl h-full flex items-center justify-between px-4">
              {/* WhyImBroke Logo */}
              <Link href="/">
                <Image
                  src={"/images/main-logo.png"}
                  className="w-25 h-25 object-fill"
                  alt="brokegrad-logo"
                  width={200}
                  height={60}
                  priority
                />
              </Link>

              {/* Right‑side controls -------------------- */}
              <SignedIn>
                <AuthNav />       {/* dashboard link, add‑txn link, UserButton */}
              </SignedIn>

              <SignedOut>
                <PublicNav />     {/* Sign‑in / Sign‑up buttons */}
              </SignedOut>
            </div>
          </header>
          {/** Header Ends */}

          {/** Main Starts */}
          <main className="pt-16 min-h-screen">{children}</main>
          <Toaster richColors/>
          {/** Main Ends */}

          {/* Footer Starts */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center ">
              <p> Made with love by Gurleen using NextJS</p>
            </div>
          </footer>
          {/* Footer Ends */}
          <Analytics/>
        </body>
      </html>
    </ClerkProvider>
  );
}
