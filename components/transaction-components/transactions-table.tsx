"use client"

import { useState, useEffect } from 'react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from '@/components/ui/checkbox'
import { categoryColors } from '@/data/categories'
import { renderRecurringBadge } from './render-recurring-badge'
import { ChevronDown, ChevronUp, EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import useFetch from '@/hooks/useFetch'
// import { deleteTransactions } from '@/actions/transactions/delete-transactions'
import { toast } from "sonner"

const TransactionsTable = ({ transactions }: { transactions: Transaction[]} ) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc"
  });

//   const {
//     data: deletedAccounts,
//     loading: deleteAccountLoading,
//     error: deleteAccountErrors,
//     func: AccountFn,
//   } = useFetch(deleteTransactions);

  const formattedTransactionsData = transactions;

  const handleSort = (field: string) => {
    setSortConfig( (current) => ({
        field,
        direction: current.field === field && current.direction === "desc" ? "asc" : "desc"
    }));
  }

  const handleSelect = (id: string) => {
    setSelectedIds(currentArr => currentArr.includes(id) ? (
        currentArr.filter(item => item != id)
    ) : (
        [...currentArr, id]
    ))
  }

  const selectedItemsInfo = (selectedIds: string[]) => {
    toast.info(`selected ${selectedIds.length} transactions`, {
        position: "top-center",
    })
  }

  const handleSelectAll = () => {
    //Either select all Ids when clicked or Deselect all of them
    if(selectedIds.length === transactions.length){
        setSelectedIds([]);
    }else {
        const allIdsArr = transactions.map(t => t.id);
        console.log(allIdsArr);
        setSelectedIds(allIdsArr);
    }
  }

  const handleDeleteTransactions = (transactions: string[]) => {
    console.log("Deleting all Transactions");

  }

  useEffect(() => {
    if (selectedIds.length === 0) return;
    toast.info(`Selected ${selectedIds.length} transactions`, {
        position: "top-center",
    })
  }, [selectedIds])

  return (
    <div className='mx-auto space-y-4 container border-1'>
        <Table>
        {/* Table Headers */}
        <TableHeader>
            <TableRow>
            <TableHead className='w-auto'>
                <Checkbox
                    onCheckedChange={() => handleSelectAll()}
                    checked={selectedIds.length === transactions.length}
                />
            </TableHead>
            <TableHead
                className="w-[100px] cursor-pointer font-bold"
                onClick={() => handleSort("date")}
            >
                <div className='flex flex-row'>Date
                    {sortConfig.field === "date" && (
                        sortConfig.direction === "desc" ? <ChevronDown className='ml-2 mt-1 h-3 w-3'/> : <ChevronUp className='ml-2 mt-1 h-3 w-3'/>
                    )}
                </div>
            </TableHead>
            <TableHead className='font-bold w-[300px]'>Description</TableHead>
            <TableHead
                className='cursor-pointer font-bold'
                onClick={() => handleSort("category")}
            >
                <div className='flex flex-row'>Category
                    {sortConfig.field === "category" && (
                        sortConfig.direction === "desc" ? <ChevronDown className='ml-2 mt-1 h-3 w-3'/> : <ChevronUp className='ml-2 mt-1 h-3 w-3'/>
                    )}
                </div>
            </TableHead>
            <TableHead
                className='cursor-pointer text-right font-bold w-[170px] pr-4'
                onClick={() => handleSort("amount")}
            >
                <div className='flex flex-row'>Amount
                    {sortConfig.field === "amount" && (
                        sortConfig.direction === "desc" ? <ChevronDown className='ml-2 mt-1 h-3 w-3'/> : <ChevronUp className='ml-2 mt-1 h-3 w-3'/>
                    )}
                </div>
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
                    <TableCell>
                        <Checkbox
                            onCheckedChange={() => handleSelect(transaction.id)}
                            checked={selectedIds.includes(transaction.id)}
                            />
                        </TableCell>
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
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                            <EllipsisVertical/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                            <DropdownMenuLabel onClick={() => {
                                router.push(`/transaction/create?edit=${transaction.id}`)
                            }}>
                                Edit
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={() => handleDeleteTransactions([transaction.id])}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
              ))
            )}
        </TableBody>
        </Table>
    </div>
  )
}

export default TransactionsTable