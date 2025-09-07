import type React from "react"
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next"

import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navbar/Navigation"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://whyimbroke.tech"),
  title: "WhyImBroke",
  description:
    "Stop wondering why you're broke. Start making smart money moves with our comprehensive financial management tools. Track expenses, create budgets, and achieve your financial goals.",
  keywords: "finance, budgeting, AI, financial management, expense tracking, personal finance, money management",
  authors: [{ name: "Gurleen Wadhwa" }],
  creator: "Gurleen Wadhwa",
  publisher: "WhyImBroke",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://whyimbroke.tech",
    title: "WhyImBroke - AI-Powered Financial Management Platform",
    description:
      "Stop wondering why you're broke. Start making smart money moves with our comprehensive financial management tools.",
    siteName: "WhyImBroke",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "WhyImBroke - Financial Management Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhyImBroke - AI-Powered Financial Management Platform",
    description:
      "Stop wondering why you're broke. Start making smart money moves with our comprehensive financial management tools.",
    images: ["/images/og-image.png"],
    creator: "@whyimbroke",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://whyimbroke.tech",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} >
      <html lang="en" className="dark scroll-smooth overflow-y-scroll">
        <head>
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#0a0a0a" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        </head>
        <body className={`${inter.className} antialiased overflow-y-scroll`}>
          <Analytics />
          <SpeedInsights />
          <Navigation>{children}</Navigation>
          <Toaster richColors/>
        </body>
      </html>
    </ClerkProvider>
  )
}


