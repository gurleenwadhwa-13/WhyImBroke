"use client"

// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "../ui/badge"

export function SectionCards({ totalIncome, totalExpense }: { totalIncome: number; totalExpense:number }) {
    return (
        <div className="flex gap-4 px-4">
          {/* Card Showing the Total Income */}
          <Card className="@container/card flex-1">
            <CardHeader>
              <CardDescription>Total Income</CardDescription>
              <CardTitle className="text-xl font-semibold tabular-nums @[150px]/card:text-2xl">
                ${totalIncome.toFixed(2)}
              </CardTitle>
              {/* <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction> */}
            </CardHeader>
          </Card>
          <Card className="@container/card flex-1">
            <CardHeader>
              <CardDescription>Total Expense</CardDescription>
              <CardTitle className="text-xl font-semibold tabular-nums @[150px]/card:text-2xl">
                ${totalExpense.toFixed(2)}
              </CardTitle>
              {/* <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction> */}
            </CardHeader>
          </Card>
          <Card className="@container/card flex-1">
            <CardHeader>
              <CardDescription>Net Balance (this period)</CardDescription>
              <CardTitle className="text-xl font-semibold tabular-nums @[150px]/card:text-2xl">
                <p className={`${totalIncome-totalExpense >= 0 ? "text-green-500" : "text-red-500"}`}>
                ${(totalIncome - totalExpense).toFixed(2)}
                </p>
              </CardTitle>
              {/* <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction> */}
            </CardHeader>
          </Card>
        </div>
    )
}