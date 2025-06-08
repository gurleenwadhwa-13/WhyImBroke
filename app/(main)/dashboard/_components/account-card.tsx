import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Account } from '@/lib/generated/prisma';

type TAccountDisplay = {
    account: Pick<Account, 'id' | 'name' | 'type' | 'balance' | 'currency' | 'isDefault'>
}

const AccountCard = ({account} : TAccountDisplay) => {
    const {name, type, balance, currency, id, isDefault} = account;

    const formatBalance = (balance: any) => {
        if (typeof balance === 'object' && balance.toNumber){
            return balance.toNumber().toFixed(2)
        }
        return Number(balance).toFixed(2)
    }

    return (
        <Card>
        <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{type}</CardDescription>
            <CardAction></CardAction>
        </CardHeader>
        <CardContent>
            <div className='text-2xl'>
                ${formatBalance(balance)}{currency}
            </div>
        </CardContent>
        <CardFooter>
            <p>{isDefault ? "Default Account": ""}</p>
        </CardFooter>
        </Card>
    )
}

export default AccountCard