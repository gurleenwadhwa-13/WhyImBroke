import { getAccountWithTransactions } from "@/actions/account/fetch-account";
import { notFound } from "next/navigation";
import AccountBarChart from "@/components/Account/accountBarChart";
import TransactionsTable from "@/components/Transaction-table-components/transactions-table";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AccountsPage ({params}: Props){
  const { id } = await params;
  const accountData = await getAccountWithTransactions(id);

  if(!accountData) return notFound()
  const { transactions, ...accountsInfo } = accountData.data;

  return (
    <>
    <div className="flex px-6 items-end justify-between">
      <div>
        <h1 className="text-5xl md:text-4xl scroll-m-20 border-b pb-2 font-semibold tracking-tight first:mt-0">{accountsInfo.name}</h1>
        <p className="text-2xl justify-around text-gray-500"> {accountsInfo.type.charAt(0) + accountsInfo.type.slice(1).toLowerCase()} Account </p>
      </div>

      <div className="text-center justify-center space-x-3 pb-4">
        <div className="text-3xl font-medium">${parseFloat((accountsInfo.balance).toString()).toFixed(2)}</div>
        <p className="text-gray-500">{accountsInfo._count.transactions} Transactions</p>
      </div>
    </div>

      {/* Account BarChart to track all income */}
      {/* <AccountBarChart /> */}

      {/* Transactions Table */}

    <div className="container space-x-4 px-6 justify-center mt-5"><TransactionsTable transactions={transactions}/></div>
    </>
  )
}