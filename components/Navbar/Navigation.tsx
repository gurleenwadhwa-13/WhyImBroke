"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import SignedOutNav from "./SignedOutNav";
import AuthenticatedLayout from "../AuthenticatedLayout/authenticatedLayout";
import { Toaster } from "@/components/ui/sonner";

// Define your dashboard routes
const DASHBOARD_ROUTES = [
  '/dashboard',
  '/accounts',
  '/transactions', 
  '/budgets',
  '/settings'
];

// Define public routes that should show the landing page even when signed in
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/privacy',
  '/terms'
];

const Navigation = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  const isDashboardRoute = DASHBOARD_ROUTES.some(route => pathname.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  return (
    <>
      <SignedOut>
        <SignedOutNav />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
      </SignedOut>

      <SignedIn>
        {isDashboardRoute ? (
          <AuthenticatedLayout>{children}</AuthenticatedLayout>
        ) : (
          // For signed-in users on public routes
          <>
            <SignedOutNav />
            <main className="pt-20 min-h-screen">
              {children}
            </main>
          </>
        )}
        <Toaster richColors />
      </SignedIn>
    </>
  );
};

export default Navigation;