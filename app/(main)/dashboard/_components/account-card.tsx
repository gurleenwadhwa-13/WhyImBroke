"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch";
import { Account } from '@/lib/generated/prisma';
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account/fetch-account";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";

type TAccountDisplay = {
    account: Pick<Account, 'id' | 'name' | 'type' | 'balance' | 'currency' | 'isDefault'>
}

const AccountCard = ({account} : TAccountDisplay) => {
    const {name, type, balance, currency, id, isDefault} = account;
    const {
    data: updatedAccount,
    func: updateDefaultAccountFn,
    loading: updateDefaultLoading,
    error
  } = useFetch(updateDefaultAccount)

    const formatBalance = (balance: any) => {
        if (typeof balance === 'object' && balance.toNumber){
            return balance.toNumber().toFixed(2)
        }
        return Number(balance).toFixed(2)
    }

    const handleDefaultAccountChange = async (event: any) => {
        event.preventDefault();

        if(isDefault){
            toast.warning("There needs to be atleast 1 default account", {
                position: "top-center",
            });
            return
        }

        await updateDefaultAccountFn(id);
        toast.success("Default Account Changed", {
            position: "top-center"
        })
    }

    return (
        <Card className="hover:shadow-md group relative">
            <Link href={`/accounts/${id}`}>
                <CardHeader>
                    <CardTitle className="text-sm font-sans capitalize">{name}</CardTitle>
                    <Switch
                      checked={isDefault}
                      onClick={handleDefaultAccountChange}
                      disabled={updateDefaultLoading}
                    />
                    <CardDescription>{isDefault ? "Default Account" : ""}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='text-2xl'>
                        ${formatBalance(balance)}{currency}
                    </div>
                </CardContent>
                <CardFooter>
                    <CardDescription>{type}</CardDescription>
                </CardFooter>
            </Link>
        </Card>
    )
}

export default AccountCard