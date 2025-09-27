"use client"

import { useEffect } from "react"
import { Account } from "@/lib/generated/prisma"
import useFetch from "@/hooks/useFetch"

import { toast } from "sonner"
import { updateDefaultAccount } from "@/actions/account/update-account"
import AccountCardView from "./AccountCardView"

type TAccountProps = {
  account: Pick<Account, 'id' | 'name' | 'type' | 'balance' | 'currency' | 'isDefault'>
}

export default function AccountCard({ account }: TAccountProps) {
  const { id, name, type, balance, currency, isDefault } = account

  const {
    data: updatedAccount,
    func: updateDefaultAccountFn,
    loading: updateDefaultLoading,
    error
  } = useFetch(updateDefaultAccount)

  const handleDefaultAccountChange = async (event: any) => {
    event.preventDefault()
    if (isDefault) {
      toast.warning("There needs to be at least 1 default account", {
        position: "top-center",
      })
      return
    }

    await updateDefaultAccountFn(id)
  }

  //Handling the success event after we updated the default status of an account
  useEffect(() => {
    if (updatedAccount?.success){
        toast.success("Default Account Changed", {
            position: "top-center",
        })
    }
  }, [updatedAccount, updateDefaultLoading])

  //Handling the error event we get while updating the default status of an account
  useEffect(() => {
    if (error){
        toast.error(error.message || "An Error Occured", {
            position: "top-center"
        })
    }
  }, [error])


  const formatBalance = (balance: any) => {
    if (typeof balance === 'object' && balance.toNumber) {
      return balance.toNumber().toFixed(2)
    }
    return Number(balance).toFixed(2)
  }

  return (
    <AccountCardView
      name={name}
      type={type}
      balance={formatBalance(balance)}
      currency={currency}
      isDefault={isDefault}
      loading={updateDefaultLoading}
      onDefaultToggle={handleDefaultAccountChange}
      href={`/accounts/${id}`}
    />
  )
}
