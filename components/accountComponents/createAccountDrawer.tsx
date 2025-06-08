"use client"

import { useState, PropsWithChildren, use, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"

//Zod Schema to be used here:
import { AccountInputSchema } from "@/lib/zod/AccountSchemas/accountSchema"
import type { AccountInputSchemaType } from "@/lib/zod/AccountSchemas/accountSchema"

//Imported UI Elements
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useFetch from "@/hooks/useFetch"
import { createAccount } from "@/actions/account/create-account"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function CreateAccountDrawer ({children}: PropsWithChildren){
  const [openDrawer, setOpenDrawer]= useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
    setValue
  } = useForm<AccountInputSchemaType>({
    resolver: zodResolver(AccountInputSchema),
    defaultValues: {
        isDefault: false
    }
  });

  const {
    data: newAccount,
    loading: createAccountLoading,
    error: createAccountErrors,
    func: createAccountFn,
  } = useFetch(createAccount)

  // Detecting new Account Creation
  useEffect(() => {
    if (newAccount && !createAccountLoading){
        toast.success("Account Created Successfully");
        reset(),
        setOpenDrawer(false);
    }
  }, [newAccount, createAccountLoading])

  // Detecting errors via Toast
  useEffect(() => {
    if (createAccountErrors){
        toast.error(createAccountErrors?.message || "Failed to create Account")

    }
  }, [createAccountErrors])

  // Here we do the API call for the onSubmit Action
  const onSubmit = async (data: FieldValues) => {
    await createAccountFn(data)
  }

    return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle className="text-2xl">Create Account</DrawerTitle>
                <DrawerDescription>Using the below form you can create a new Account and sync with WhyImBroke.</DrawerDescription>
            </DrawerHeader>
            <div className="px-5 pb-3">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Account Name</Label>
                        <Input
                            {...register("name")}
                            className="mx-auto justify-center px-5 mb-2"
                            type="name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Account Type</Label>
                        <Select
                            onValueChange={(value) => setValue("type", value as "SAVINGS" | "CHEQUING")}
                            defaultValue={watch("type")}
                        >
                        <SelectTrigger id="type" className="w-[250px]">
                            <SelectValue placeholder="e.g., Savings or Chequing" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SAVINGS">Savings</SelectItem>
                            <SelectItem value="CHEQUING">Chequing</SelectItem>
                        </SelectContent>
                        </Select>
                        {errors.type && (
                            <p className="text-sm text-red-500">{errors.type.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="currency">Currency Type</Label>
                        <Select
                            onValueChange={(value) => setValue("currency", value as "CAD" | "USD" | "INR")}
                            defaultValue={watch("currency")}
                        >
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="e.g., CAD, USD or INR" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CAD">CAD</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="INR">INR</SelectItem>
                        </SelectContent>
                        </Select>
                        {errors.currency && (
                            <p className="text-sm text-red-500">{errors.currency.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="balance" className="text-sm font-medium">Account Balance</Label>
                        <Input
                            id="balance"
                            type="number"
                            placeholder="Add your Current Account Balance to sync them perfectly"
                            className="mx-auto justify-center px-5 mb-2"
                            {...register("balance")}
                        />
                        {errors.balance && (
                            <p className="text-sm text-red-500">{errors.balance.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="isDefault">Set as Default</Label>
                        <Select
                            onValueChange={(value) => setValue("isDefault", value === "true")}
                            defaultValue={watch("isDefault") ? "true" : "false"}
                        >
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Make this Default?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                        </Select>
                        {errors.isDefault && (
                            <p className="text-sm text-red-500">{errors.isDefault.message}</p>
                        )}
                    </div>

                    <div className="flex gap-5 pt-4 p-3">
                        <DrawerClose asChild>
                            <Button type="button" variant="outline" className="flex-1">
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button type="submit" variant="default" className="flex-1" disabled={createAccountLoading}>
                            {createAccountLoading ? (
                                <>
                                <Loader2 className="mr-2 animate-spin"/>
                                Creating...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </DrawerContent>
    </Drawer>
  )
}