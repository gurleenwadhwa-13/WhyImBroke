"use client"

import { Transaction } from '@/lib/generated/prisma'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from '@/components/ui/checkbox'

const TransactionsTable = ({ transactions }: { transactions: Transaction[]} ) => {

  const formattedTransactionsData = transactions;

  const handleSort = (parameter: string) => {
    console.log(parameter);
  }

  return (
    <div className='mx-auto space-y-4'>
        <Table>
        {/* <TableCaption>All Transactions</TableCaption> */}
        <TableHeader>
            <TableRow>
            <TableHead className='w-auto'>
                <Checkbox/>
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
                className='cursor-pointer text-right font-bold w-[200px]'
                onClick={() => handleSort("amount")}
            >
                <div>Amount</div>
            </TableHead>
            <TableHead className='font-bold'>Recurring</TableHead>
            <TableHead></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {formattedTransactionsData.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={7} className='text-center text-muted-foreground'>
                        <span>No Transactions found</span>
                    </TableCell>
                </TableRow>
            ) : (
            formattedTransactionsData.map((item, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell> <Checkbox/> </TableCell>
                            <TableCell className="font-medium">{}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    )
                })
            )}
        </TableBody>
        </Table>
    </div>
  )
}

export default TransactionsTable