import { FetchAccounts } from "@/actions/account/fetch-account";
import AccountCard from "@/components/AccountCard/AccountCard";
import { getUser } from "@/actions/users/fetch-user";
import CreateAccountDrawer from "@/components/Account/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";
// import AccountLineChart from "@/components/AccountGraphs/account-line-chart";

export default async function AccountsPage() {
  const { success } = await getUser();
  const { data: accounts } = await FetchAccounts();
  if (!success) {
    return toast.error("Failed to fetch user");
  }

  return (
    <div className="flex flex-col gap-4 pt-0 md:flex-col`">
      <div className="border-b border-border p-3">
        <div className="flex flex-row items-center justify-between">
          <div className="w-[50%]">
            <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
            <p className="text-muted-foreground mt-1">
              Detailed breakdown of your accounts and their health
            </p>
          </div>
        </div>
      </div>

      {/*Will add this to the accounts page later.*/}
      {/*<div className="flex flex-col md:flex-col lg:flex-col ">
              <AccountLineChart/>
          </div>*/}

      {/* Accounts Grid */}
      <div className="grid gap-4 px-3 md:grid-cols-2 lg:grid-cols-3">
        {accounts.length > 0 &&
          accounts.map((x) => <AccountCard key={x.id} account={x} />)}

        <CreateAccountDrawer>
          <Card className="flex m-4 px-5 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Plus className="h-10 w-10 mx-auto mb-2" />
              <p className="text-m font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>
    </div>
  );
}
