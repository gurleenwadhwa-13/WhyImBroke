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
import { Analytics } from "@vercel/analytics/next"

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
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={`${inter.className}`}>
          {/** Header Starts */}
          <Header />
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {/** Header Ends */}

          {/** Main Starts */}
          <main className="min-h-screen">{children}</main>
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
