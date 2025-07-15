// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import {
//   ClerkProvider,
//   SignedIn,
//   SignedOut,
// } from '@clerk/nextjs'
// import { Toaster } from "@/components/ui/sonner";
// import { Analytics } from "@vercel/analytics/next";
// import Link from "next/link";
// import Image from "next/image";
// import AuthNav from "@/components/Navbar/AuthNav";
// import PublicNav from "@/components/Navbar/PublicNav";

// export const metadata: Metadata = {
//   title: "WhyImBroke.tech - Take Control of Your Finances",
//   description: "Smart financial decisions made simple. Track expenses, budget better, and achieve your financial goals with WhyImBroke.tech",
// };

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   preload: true,
// })

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} >
//       <html lang="en" className="overflow-y-scroll">
//         <head>
//           <link rel="icon" href="/favicon.ico" sizes="any" />
//           <link rel="icon" href="/icon.svg" type="image/svg+xml" />
//           <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
//           <link rel="manifest" href="/manifest.json" />
//           <meta name="theme-color" content="#0a0a0a" />
//           <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
//         </head>
//         <body className={`${inter.className} overflow-y-scroll`}>
//           {/** Header Starts */}
//           <header className="fixed inset-x-0 top-0 z-50 h-26 bg-white/80 backdrop-blur-md border-b">
//             <div className="mx-auto max-w-screen-xl h-full flex items-center justify-between px-4">
//               {/* WhyImBroke Logo */}
//               <Link href="/">
//                 <Image
//                   src={"/images/main-logo.png"}
//                   className="w-25 h-25 object-fill"
//                   alt="brokegrad-logo"
//                   width={200}
//                   height={60}
//                   priority
//                 />
//               </Link>

//               {/* Right‑side controls -------------------- */}
//               <SignedIn>
//                 <AuthNav />       {/* dashboard link, add‑txn link, UserButton */}
//               </SignedIn>

//               <SignedOut>
//                 <PublicNav />     {/* Sign‑in / Sign‑up buttons */}
//               </SignedOut>
//             </div>
//           </header>
//           {/** Header Ends */}

//           {/** Main Starts */}
//           <main className="pt-16 min-h-screen">{children}</main>
//           <Toaster richColors/>
//           {/** Main Ends */}

//           {/* Footer Starts */}
//           <footer className="bg-blue-50 py-12">
//             <div className="container mx-auto px-4 text-center ">
//               <p> Made with love by Gurleen using NextJS</p>
//             </div>
//           </footer>
//           {/* Footer Ends */}
//           <Analytics/>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


import type React from "react"
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next"

import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/Navbar/Navigation"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
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
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#0a0a0a" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        </head>
        <body className={`${inter.className} antialiased overflow-y-scroll`}>
          <header>
            <Navigation />
          </header>

          <main className="min-h-screen">
            {children}
            <Toaster richColors/>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}


