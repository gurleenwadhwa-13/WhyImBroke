"use client"

import * as React from "react"
import { UserButton } from "@clerk/nextjs"
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  Target,
  BarChart3,
  PenBox,
  CreditCard,
  TrendingUp,
  Settings,
  Plus,
  History,
  Calendar,
  Download
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// WhyImBroke application navigation data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: Receipt,
      // items: [
      //   {
      //     title: "All Transactions",
      //     url: "/transactions",
      //   },
      //   {
      //     title: "Add Transaction",
      //     url: "/transactions/create",
      //   },
      //   {
      //     title: "Import Transactions",
      //     url: "/transactions/import",
      //   },
      //   {
      //     title: "Transaction History",
      //     url: "/transactions/history",
      //   },
      //   {
      //     title: "Categories",
      //     url: "/transactions/categories",
      //   },
      // ],
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: Wallet,
      // items: [
      //   {
      //     title: "View Accounts",
      //     url: "/accounts/",
      //   },
      //   {
      //     title: "Add Account",
      //     url: "/accounts/create",
      //   },
      //   {
      //     title: "Account Settings",
      //     url: "/accounts/settings",
      //   },
      // ],
    },
    {
      title: "Budgets",
      url: "/budgets",
      icon: Target,
      // items: [
      //   {
      //     title: "View Budgets",
      //     url: "/budgets",
      //   },
      //   {
      //     title: "Create Budget",
      //     url: "/budgets/create",
      //   },
      //   {
      //     title: "Budget Analysis",
      //     url: "/budgets/analysis",
      //   },
      //   {
      //     title: "Budget Goals",
      //     url: "/budgets/goals",
      //   },
      // ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      // items: [
      //   {
      //     title: "Spending Overview",
      //     url: "/analytics/spending",
      //   },
      //   {
      //     title: "Income vs Expenses",
      //     url: "/analytics/income-expenses",
      //   },
      //   {
      //     title: "Category Breakdown",
      //     url: "/analytics/categories",
      //   },
      //   {
      //     title: "Monthly Trends",
      //     url: "/analytics/trends",
      //   },
      //   {
      //     title: "Financial Reports",
      //     url: "/analytics/reports",
      //   },
      // ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      // items: [
      //   {
      //     title: "Profile",
      //     url: "/settings/profile",
      //   },
      //   {
      //     title: "Preferences",
      //     url: "/settings/preferences",
      //   },
      //   {
      //     title: "Notifications",
      //     url: "/settings/notifications",
      //   },
      //   {
      //     title: "Security",
      //     url: "/settings/security",
      //   },
      //   {
      //     title: "Data & Privacy",
      //     url: "/settings/privacy",
      //   },
      // ],
    },
  ],
  analytics: [
    {
      name: "View Reports",
      url: "/analytics/reports",
      icon: TrendingUp,
    },
    {
      name: "Monthly Report",
      url: "/analytics/reports?period=monthly",
      icon: Calendar,
    },
    {
      name: "Export Data",
      url: "/settings/export",
      icon: Download,
    },
  ],
}

// Path mapping for breadcrumbs - centralized with navigation
export const pathMappings: Record<string, string> = {
  'dashboard': 'Dashboard',
  'transactions': 'Transactions',
  'accounts': 'Accounts',
  'budgets': 'Budgets',
  'analytics': 'Analytics',
  'settings': 'Settings',
  'create': 'Create',
  'edit': 'Edit',
  'import': 'Import',
  'history': 'History',
  'categories': 'Categories',
  'spending': 'Spending Overview',
  'income-expenses': 'Income vs Expenses',
  'trends': 'Monthly Trends',
  'reports': 'Financial Reports',
  'analysis': 'Budget Analysis',
  'goals': 'Budget Goals',
  'profile': 'Profile',
  'preferences': 'Preferences',
  'notifications': 'Notifications',
  'security': 'Security',
  'privacy': 'Data & Privacy',
  'export': 'Export Data'
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">WhyImBroke</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.analytics} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}













// // This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }