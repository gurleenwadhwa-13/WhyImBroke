"use client"

import { useEffect } from "react"
import { Account } from "@/lib/generated/prisma"
import useFetch from "@/hooks/useFetch"

import { toast } from "sonner"
import { updateDefaultAccount } from "@/actions/account/fetch-account"
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

  useEffect(() => {
    if (updatedAccount?.success){
        toast.success("Default Account Changed", {
            position: "top-center",
        })
    }
  }, [updatedAccount, updateDefaultLoading])


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
