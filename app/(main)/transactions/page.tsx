"use client"

import React from 'react'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TransactionsTable from '@/components/Transaction-table-components/transactions-table';
import { useUser } from '@clerk/nextjs';

export default function TransactionPage(){

  const { user } = useUser();
  console.log(user);

  // const { transactions} = getAllUserTransactions()

  return (
    <div className='flex min-h-screen'>
      <main className='flex-1 flex flex-row justify-between'>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your financial transactions</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
      </main>

      <div className="container space-x-4 px-6 justify-center mt-5">
        {/* <TransactionsTable transactions={transactions}/> */}
      </div>
    </div>
  )
}