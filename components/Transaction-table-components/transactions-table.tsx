"use client"

import { useState, useEffect, useMemo } from 'react'
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Checkbox } from '@/components/ui/checkbox'
import { categoryColors, defaultCategories } from '@/data/categories'
import { renderRecurringBadge } from './render-recurring-badge'
import { ChevronDown, ChevronUp, EllipsisVertical, Search, SearchCodeIcon, Trash, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import deleteTransactions from '@/actions/transactions/delete-transactions'
import { toast } from "sonner"
import { Input } from '../ui/input'
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '../ui/select'
import { Button } from '../ui/button'
import { BarLoader } from 'react-spinners'

const TransactionsTable = ({ transactions }: { transactions: Transaction[]} ) => {
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchVar, setSearchVar] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [recurringFilter, setRecurringFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc"
  });

  const {
    data: deletedData,
    loading: deleteTransactionLoadingState,
    error: deleteTransactionsError,
    func: deleteTransactionFn
  } = useFetch(deleteTransactions)

  const formattedTransactionsData = useMemo(() => {
    let result = [...transactions];

    //Applying the search filter
    if(searchVar){
        //convert the search term into lower case.
        const searchWordLower = searchVar.toLowerCase();

        //Check it against the description of the transactions
        result = result.filter((transaction) =>
            transaction.description?.toLowerCase().includes(searchWordLower)
        );
    }

    //Applying the recurring type filter
    if(recurringFilter){
        result = result.filter((transaction) => {
            if(recurringFilter === "recurring") return transaction.isRecurring;
            return !transaction.isRecurring;
        });
    }

    //Applying the transaction type filter
    if(typeFilter){
        result = result.filter((transaction) => {
            if(typeFilter === "INCOME") return transaction.type === "INCOME";
            return transaction.type === "EXPENSE";
        })
    }

    result.sort((a: any,b: any) => {
        let comparison: any = 0;

        switch(sortConfig.field) {
            case "date":
                comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                break;
            case "category":
                comparison = (a.category ?? "").localeCompare(b.category ?? "");
                break;
            case "amount":
                comparison = a.amount - b.amount;
                break;
            default:
                comparison = 0;
        }

        return sortConfig.direction === "desc" ? -comparison : comparison;
    });

    return result;
  }, [
    searchVar,
    typeFilter,
    recurringFilter,
    transactions,
    sortConfig
  ]);

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

  const handleDeleteTransactions = () => {
    deleteTransactionFn(selectedIds);
  }

  useEffect(() => {
    if(!deleteTransactionLoadingState && deletedData){
        toast.success("Transactions deleted successfully", {position: 'top-center'})
    }
  }, [deletedData, deleteTransactionLoadingState])

  const handleClearAllFilters = () => {
    setRecurringFilter("");
    setTypeFilter("");
    setSearchVar("");
    setSelectedIds([]);
  }

  return (
    <div className='space-y-4'>

        {deleteTransactionLoadingState && (
            <BarLoader className='pt-4' width="100%"/>
        )}

        {/* Filters */}
        <div className='flex flex-col sm:flex-row'>
            <div className='relative flex-3'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground'/>
                <Input
                    placeholder='Search Transactions...'
                    value={searchVar}
                    onChange={(e) => setSearchVar(e.target.value)}
                    className='pl-8'
                />
            </div>

            <div className='flex flex-3 sm:flex-1 pl-2 gap-2'>
                {/* <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                >
                    <SelectTrigger className="w-[170px]">
                        <SelectValue placeholder="Category Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {defaultCategories.map((item) => {
                            return <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        })}
                    </SelectContent>
                </Select> */}

                <Select
                    value={typeFilter}
                    onValueChange={setTypeFilter}
                >
                    <SelectTrigger className="w-[170px] hover:bg-gray-100 checked:bg-cyan-300">
                        <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='INCOME'>Income</SelectItem>
                        <SelectItem value='EXPENSE'>Expense</SelectItem>
                    </SelectContent>
                </Select>

                 <Select
                    value={recurringFilter}
                    onValueChange={setRecurringFilter}
                 >
                    <SelectTrigger className="w-[175px] hover:bg-gray-100">
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='recurring'>Recurring Only</SelectItem>
                        <SelectItem value='non-recurring'>Non-recurring Only</SelectItem>
                    </SelectContent>
                </Select>

                {selectedIds.length > 0 && (
                    <div className="flex items-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                >
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete {selectedIds.length} transaction(s)
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the selected transactions and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteTransactions}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}

                {(recurringFilter || typeFilter || searchVar) && (
                    <div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleClearAllFilters}
                        title='Clear Filters'
                      >
                        X
                      </Button>
                    </div>
                )}
            </div>
        </div>

        {/* Transactions Table */}
        <div className='mx-auto container space-y-4 rounded-md border-1 overflow-x-auto'>
            <Table className='min-w-full whitespace-nowrap'>
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
                        <TableCell className="text-right pr-5" style={{color: transaction.type === "EXPENSE" ? "red" : "green"}}>
                            {transaction.type === "EXPENSE" ? "-" : "+"}
                            ${transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>{renderRecurringBadge(transaction)}</TableCell>
                        <TableCell className='relative'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="p-1 rounded-sm hover:bg-gray-50/10">
                                        <EllipsisVertical className='h-5 w-5'/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="start"
                                    side="left"
                                    className="w-[130px] z-50"
                                    sideOffset={5}
                                >
                                <DropdownMenuLabel className='hover:bg-gray-700 cursor-pointer' onClick={() => {
                                    router.push(`/transaction/create?edit=${transaction.id}`)
                                }}>
                                    Edit
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" className='hover:bg-gray-700 cursor-pointer transition-colors' onClick={() => deleteTransactionFn([transaction.id])}>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))
                )}
            </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default TransactionsTable