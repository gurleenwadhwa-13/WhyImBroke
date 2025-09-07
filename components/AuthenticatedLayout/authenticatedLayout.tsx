// components/AuthenticatedLayout.tsx
"use client";

import { usePathname } from "next/navigation"

import { AppSidebar, pathMappings } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "../site-header";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define static route mappings
const routeMappings: Record<string, {
  label: string,
  showInBreadcrumb: boolean
}> = {
  dashboard: { label: 'Dashboard', showInBreadcrumb: true },
  accounts: { label: 'Accounts', showInBreadcrumb: true },
  transactions: { label: 'Transactions', showInBreadcrumb: true },
  budgets: { label: 'Budgets', showInBreadcrumb: true },
  settings: { label: 'Settings', showInBreadcrumb: true },
  create: { label: 'Create', showInBreadcrumb: true },
  edit: { label: 'Edit', showInBreadcrumb: true },
}

interface Breadcrumb {
  label: string
  href: string
  isLast: boolean
}

// Function to generate breadcrumbs based on the current path
function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: Breadcrumb[] = []
  let currentPath = ''

  // Filter and map segments to breadcrumbs
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Skip if segment is a UUID (account ID)
    if (segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      return
    }

    // Check if segment has a mapping
    const mapping = routeMappings[segment]
    if (mapping?.showInBreadcrumb) {
      breadcrumbs.push({
        label: mapping.label,
        href: currentPath,
        isLast: index === segments.length - 1 || index === segments.length - 2 // Account for skipped UUIDs
      })
    }
  })

  return breadcrumbs
}


export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <div key={breadcrumb.href} className="flex items-center">
                    {index > 0 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                    <BreadcrumbItem>
                      {breadcrumb.isLast ? (
                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}