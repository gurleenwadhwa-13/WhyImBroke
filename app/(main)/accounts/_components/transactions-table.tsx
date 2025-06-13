"use client"

import { Transaction } from '@/lib/generated/prisma'
import { format } from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'
import { categoryColors } from '@/data/categories'
import { renderRecurringBadge } from './render-recurring-badge'

const TransactionsTable = ({ transactions }: { transactions: Transaction[]} ) => {

  const formattedTransactionsData = transactions;

  const handleSort = (parameter: string) => {
    console.log(parameter);
  }

  const setSelectAllItems = () => {
    console.log("")
  }

  return (
    <div className='mx-auto space-y-4 container border-1'>
        <Table>
        {/* Table Headers */}
        <TableHeader>
            <TableRow>
            <TableHead className='w-auto'>
                <Checkbox onClick={() => setSelectAllItems()}/>
            </TableHead>
            <TableHead
                className="w-[100px] cursor-pointer font-bold"
                onClick={() => handleSort("date")}
            >
                <div>Date</div>
            </TableHead>
            <TableHead className='font-bold w-[300px]'>Description</TableHead>
            <TableHead
                className='cursor-pointer font-bold'
                onClick={() => handleSort("category")}
            >
                <div>Category</div>
            </TableHead>
            <TableHead
                className='cursor-pointer text-right font-bold w-[170px] pr-4'
                onClick={() => handleSort("amount")}
            >
                <div>Amount</div>
            </TableHead>
            <TableHead className='font-bold'>Recurring</TableHead>
            <TableHead></TableHead>
            </TableRow>
        </TableHeader>

        {/* Table Body Section */}
        <TableBody>
            {formattedTransactionsData.length === 0 ? (   //We render this first conditional when there is no transactions
                <TableRow>
                    <TableCell colSpan={7} className='text-center text-muted-foreground'>
                        <span>No Transactions found</span>
                    </TableCell>
                </TableRow>
            ) : (
              formattedTransactionsData.map((transaction) => (
                <TableRow key={transaction.id}>
                    <TableCell> <Checkbox/> </TableCell>
                    <TableCell className="font-medium">
                        {format(transaction.date, "PPP")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="capitalize">
                        <span
                            style={{
                                background: categoryColors[transaction.category],
                            }}
                            className='px-2 py-1 rounded-2xl text-white'
                        >
                            {transaction.category}
                        </span>
                    </TableCell>
                    <TableCell className="text-right pr-5" style={{color: transaction.type === "EXPENSE" ? "red" : "blue"}}>
                        {transaction.type === "EXPENSE" ? "-" : "+"}
                        ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{renderRecurringBadge(transaction)}</TableCell>
                </TableRow>
              ))
            )}
        </TableBody>
        </Table>
    </div>
  )
}

export default TransactionsTable