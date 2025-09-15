import { FetchAccounts } from "@/actions/account/fetch-account"
import AccountCard from "@/app/(main)/dashboard/_components/AccountCard"
import { getUser } from "@/actions/users/getUser"
import CreateAccountDrawer from "@/components/Account/create-account-drawer"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { toast } from "sonner"


export default async function AccountsPage() {
    const { success } = await getUser()
    if (!success) {
    return toast.error("Failed to fetch user")
    }

    const { data: accounts } = await FetchAccounts()
    return (
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
    )
}