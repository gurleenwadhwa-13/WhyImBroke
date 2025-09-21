import { fetchTransactions } from '@/actions/transactions/fetch-transactions'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TransactionsTable from '@/components/Transaction-table-components/transactions-table';
import { toast } from 'sonner';
import CreateTransactionDialog from '@/components/Transactions/create-transaction-dialog';
import { FetchAccounts } from "@/actions/account/fetch-account"

export default async function TransactionPage(){
  const { success, data: transactions } = await fetchTransactions();
  const {data: accountList} = await FetchAccounts();

  if(!success){
    toast.error("Failed to fetch transactions! Try again later.")
  }

  return (
    <div className='flex min-h-screen bg-background'>
      <main className='flex-1 flex flex-col'>

        <div className='border-b border-border p-3'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
              <p className="text-muted-foreground mt-1">Manage and track all your financial transactions</p>
            </div>
            <CreateTransactionDialog accounts={accountList}/>
          </div>
        </div>

        <div className="container space-x-4 px-3 justify-center mt-5">
          <TransactionsTable transactions={transactions}/>
        </div>
      </main>
    </div>
  )
}