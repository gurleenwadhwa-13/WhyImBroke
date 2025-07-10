import { FetchAccounts } from "@/actions/account/fetch-account"

import AccountCard from "@/app/(main)/dashboard/_components/AccountCard"
import CreateAccountDrawer from "@/components/Account/createAccountDrawer"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Plus } from "lucide-react"

// Force dynamic rendering to allow Clerk's auth
export const dynamic = 'force-dynamic';

export default async function DashboardPage () {
  const { data: accounts} = await FetchAccounts();

  return (
    <div className='px-5'>
      {/* Budget Progress */}

      {/* Dashboard Overview */}

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
          accounts?.map((x) => {
            return <AccountCard key={x.id} account={x}/>
        })}
      </div>
    </div>
  )
}