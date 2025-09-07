// import { getUser } from "@/actions/users/getUser"
// import { FetchAccounts } from "@/actions/account/fetch-account"
// import AccountCard from "@/app/(main)/dashboard/_components/AccountCard"

// //ShadCN component from @/components
// import { AppSidebar } from "@/components/app-sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import CreateAccountDrawer from "@/components/Account/create-account-drawer"
// import { Card, CardContent, CardDescription } from "@/components/ui/card"
// import { Plus } from "lucide-react"

// export default async function Page() {
//   // Load or create the user
//   const { success } = await getUser()
//   if (!success) {
//     return <div className="p-4">Error loading user</div>
//   }

//   // Fetch user accounts
//   const { data: accounts } = await FetchAccounts()

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
//           <div className="flex items-center gap-2 px-4">
//             <SidebarTrigger className="-ml-1" />
//             <Separator
//               orientation="vertical"
//               className="mr-2 data-[orientation=vertical]:h-4"
//             />
//             <Breadcrumb>
//               <BreadcrumbList>
//                 <BreadcrumbItem className="hidden md:block">
//                   <BreadcrumbLink href="#">
//                     Dashboard
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator className="hidden md:block" />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>Overview</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//           </div>
//         </header>

//         {/* Budget Progrew*/}
        
//         {/* Dashboard Overview */}
//         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//           <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//             <div className="bg-muted/50 aspect-video rounded-xl" />
//             <div className="bg-muted/50 aspect-video rounded-xl" />
//             <div className="bg-muted/50 aspect-video rounded-xl" />
//           </div>
//           <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//           {/* Accounts Grid */}
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             <CreateAccountDrawer>
//               <Card className="flex m-4 px-5 hover:shadow-md transition-shadow cursor-pointer">
//                 <CardContent className="flex flex-col items-center justify-center h-full text-muted-foreground">
//                   <Plus className="h-10 w-10 mx-auto mb-2" />
//                   <p className="text-m font-medium">Add New Account</p>
//                 </CardContent>
//               </Card>
//             </CreateAccountDrawer>

//             {accounts.length > 0 &&
//               accounts.map((x) => (
//                 <AccountCard key={x.id} account={x} />
//               ))}
//           </div>
//         </div>

//       </SidebarInset>
//     </SidebarProvider>
//   )
// }


import { getUser } from "@/actions/users/getUser"
import { FetchAccounts } from "@/actions/account/fetch-account"
import AccountCard from "@/app/(main)/dashboard/_components/AccountCard"
import CreateAccountDrawer from "@/components/Account/create-account-drawer"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default async function DashboardPage() {
  const { success } = await getUser()
  if (!success) {
    return <div className="p-4">Error loading user</div>
  }

  const { data: accounts } = await FetchAccounts()

  return (
    <>
      {/* Budget Progrew*/}

      {/* Dashboard Overview */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Accounts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="flex m-4 px-5 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Plus className="h-10 w-10 mx-auto mb-2" />
                <p className="text-m font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {accounts.length > 0 &&
            accounts.map((x) => (
              <AccountCard key={x.id} account={x} />
            ))}
        </div>
      </div>
    </>
  )
}
