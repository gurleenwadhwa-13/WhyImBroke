import { getUser } from "@/actions/users/getUser"
import { FetchAccounts } from "@/actions/account/fetch-account"

import AccountCard from "@/app/(main)/dashboard/_components/AccountCard"
import CreateAccountDrawer from "@/components/Account/createAccountDrawer"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { toast, Toaster } from "sonner"

// Force dynamic rendering to allow Clerk's auth
export const dynamic = 'force-dynamic';

export default async function DashboardPage () {
  //We first need to load the user from the DB if its exists or getUser will create the user during a sign up process through creds from Clerk Auth.
  const { success } = await getUser();

  if(!success){
    return <div>Error loading user</div>
  }

  //Finding Accounts connected to the logged in user
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