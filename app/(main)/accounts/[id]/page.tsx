import { getAccountWithTransactions } from "@/actions/account/fetch-account";
import { notFound } from "next/navigation";
import AccountBarChart from "@/components/accountComponents/accountBarChart";
import TransactionsTable from "../../transactions/_components/transactions-table";


export default async function AccountsPage ({params}: {params: {id: string } }){
  const id = params.id

  const accountData = await getAccountWithTransactions(id);

  if(!accountData) return notFound()
  const { transactions, ...accountsInfo } = accountData.data;

  return (
    <>
    <div className="flex px-6 items-end justify-between">
      <div>
        <h1 className="text-5xl md:text-4xl gradient-title font-medium">{accountsInfo.name}</h1>
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