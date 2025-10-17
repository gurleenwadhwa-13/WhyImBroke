"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldValues, useForm } from "react-hook-form"
import useFetch from "@/hooks/useFetch"
import CreateTransactions from "@/actions/transactions/create-transactions"
import { format } from "date-fns"

//imported Zod Schemas and Prisma Types:
import { TransactionInputSchema } from "@/lib/zod/TransactionSchemas/transactionSchema";
import type { TransactionInputSchemaType } from "@/lib/zod/TransactionSchemas/transactionSchema";
import { Account, TransactionType, RecurringIntervalList } from "@prisma/client"

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDownIcon, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const income_categories = ["salary", "freelance", "investments", "other income"];
const expense_categories = ["housing", "transportation", "groceries", "entertainment", "food", "shopping", "healthcare", "education", "travel"];

type CategoryType = typeof income_categories[number] | typeof expense_categories[number];

interface CreateTransactionDialogProps {
    accounts: Account[]
}

export default function CreateTransactionDialog ({accounts}: CreateTransactionDialogProps) {
    const [open, setOpen] = useState(false);
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        reset,
        setValue,
        control
      } = useForm<TransactionInputSchemaType>({
        resolver: zodResolver(TransactionInputSchema),
        defaultValues: {
            isRecurring: false
        }
      });

    const {
        data: newTransaction,
        loading: createTransactionLoading,
        error: createTransactionErrors,
        func: createTransactionFunc,
    } = useFetch(CreateTransactions)

    // Handle successful transaction creation
    useEffect(() => {
        if (newTransaction && !createTransactionLoading) {
            toast.success("Transaction created successfully");
            reset();
            setOpen(false);
        }
    }, [newTransaction, createTransactionLoading]);

    // Handle errors
    useEffect(() => {
        if (createTransactionErrors) {
            toast.error(createTransactionErrors?.message || "Failed to create transaction");
        }
    }, [createTransactionErrors]);

    const onSubmit = async(data: FieldValues) => {
        await createTransactionFunc(data);
    }

    // Watch transaction type to show relevant categories
    const transactionType = watch("type");
    const categories = transactionType === "INCOME" ? income_categories : expense_categories;

    return (
        <div className="flex flex-row-reverse p-6 justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                <Button variant="default" className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Transaction
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add New Transaction</DialogTitle>
                            <DialogDescription>
                                Add all required fields. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                        {/* Transaction Type */}
                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                onValueChange={(value) => setValue("type", value as TransactionType)}
                                defaultValue={watch("type")}
                            >
                                <SelectTrigger className="w-[380px]">
                                    <SelectValue placeholder="Select transaction type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="INCOME">Income</SelectItem>
                                    <SelectItem value="EXPENSE">Expense</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && (
                                <p className="text-sm text-red-500">{errors.type.message}</p>
                            )}
                        </div>

                        {/* Account Selection*/}
                        <div className="grid gap-5">
                            <Label htmlFor="accountId">Account</Label>
                            <Select
                                onValueChange={(value) => setValue("accountId", value)}
                                defaultValue={watch("accountId")}
                            >
                            <SelectTrigger className="w-[380px]">
                                <SelectValue placeholder="Select Account Associated"/>
                            </SelectTrigger>
                            <SelectContent>
                                {accounts.map((account) => {
                                    return <SelectItem key={account.id} value={account.id}>
                                        {account.name}
                                    </SelectItem>
                                })}
                            </SelectContent>
                            </Select>
                        </div>

                        {/* Amount */}
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                {...register("amount")}
                                type="number"
                                step="0.01"
                                placeholder="Enter amount"
                            />
                            {errors.amount && (
                                <p className="text-sm text-red-500">{errors.amount.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                {...register("description")}
                                type="text"
                                placeholder="Enter description"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                onValueChange={(value: CategoryType) => setValue("category", value as CategoryType)}
                                defaultValue={watch("category") as string}
                            >
                                <SelectTrigger className="w-[380px]">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category && (
                                <p className="text-sm text-red-500">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Date */}
                        <Controller
                            control={control}
                            name="date"
                            defaultValue={new Date()}
                            render={({ field }) => {
                                return <div className="grid gap-2">
                                    <Label htmlFor="date" className="px-1">Date</Label>
                                    <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="w-48 justify-between font-normal"
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                captionLayout="dropdown"
                                                onSelect={field.onChange}
                                                autoFocus />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.date && (
                                        <p className="text-sm text-red-500">{errors.date?.message}</p>
                                    )}
                                </div>
                            }}
                        />

                        {/* Recurring Transaction */}
                        <div className="grid gap-2">
                            <Label htmlFor="isRecurring">Is this recurring?</Label>
                            <Select
                                onValueChange={(value) => setValue("isRecurring", value === "true")}
                                defaultValue={watch("isRecurring") ? "true" : "false"}
                            >
                                <SelectTrigger className="w-[380px]">
                                    <SelectValue placeholder="Is this a recurring transaction?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Recurring Interval - Only show if isRecurring is true */}
                        {watch("isRecurring") && (
                            <div className="grid gap-2">
                                <Label htmlFor="recurringInterval">Recurring Interval</Label>
                                <Select
                                    onValueChange={(value) => setValue("recurringInterval", value as RecurringIntervalList)}
                                    defaultValue={watch("recurringInterval")}
                                >
                                    <SelectTrigger className="w-[380px]">
                                        <SelectValue placeholder="Select interval" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DAILY">Daily</SelectItem>
                                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                                        <SelectItem value="BIWEEKLY">Bi-weekly</SelectItem>
                                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                                        <SelectItem value="YEARLY">Yearly</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.recurringInterval && (
                                    <p className="text-sm text-red-500">{errors.recurringInterval.message}</p>
                                )}
                            </div>
                        )}
                        </div>
                        <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                            Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={createTransactionLoading}>
                            {createTransactionLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Transaction"
                            )}
                        </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )

}