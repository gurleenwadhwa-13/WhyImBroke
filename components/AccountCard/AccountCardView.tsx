"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export type TAccountCardViewProps = {
  name: string
  type: string
  balance: string
  currency: string
  isDefault: boolean
  loading: boolean
  onDefaultToggle: (event: any) => void
  href: string
}

export default function AccountCardView({
  name,
  type,
  balance,
  currency,
  isDefault,
  loading,
  onDefaultToggle,
  href,
}: TAccountCardViewProps) {
  return (
    <Card className="hover:shadow-md group relative">
      <Link href={href}>
        <CardHeader>
          <CardTitle className="text-sm font-sans capitalize">{name}</CardTitle>
          <Switch
            checked={isDefault}
            onClick={onDefaultToggle}
            disabled={loading}
          />
          <CardDescription>{isDefault ? "Default Account" : ""}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-2xl'>
            ${balance}{currency}
          </div>
        </CardContent>
        <CardFooter>
          <CardDescription>{type}</CardDescription>
        </CardFooter>
      </Link>
    </Card>
  )
}