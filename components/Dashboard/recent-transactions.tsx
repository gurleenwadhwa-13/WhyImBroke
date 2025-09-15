"use client"

import { ArrowDownRight, ArrowUpRight, Clock1 } from "lucide-react";
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'

type RecentTransactionType = any | undefined;

export function RecentTransactionsSummary({ transactions }: { transactions: RecentTransactionType[] }) {
    const recentTransactions = [
    {
      id: 1,
      description: "Salary Deposit",
      amount: 4250,
      type: "income",
      date: "2024-01-02",
      category: "Salary",
    },
    {
      id: 2,
      description: "Grocery Store",
      amount: -125.5,
      type: "expense",
      date: "2024-01-02",
      category: "Food",
    },
    {
      id: 3,
      description: "Gas Station",
      amount: -65.0,
      type: "expense",
      date: "2024-01-01",
      category: "Transportation",
    },
    {
      id: 4,
      description: "Freelance Payment",
      amount: 800,
      type: "income",
      date: "2024-01-01",
      category: "Freelance",
    },
    {
      id: 5,
      description: "Netflix Subscription",
      amount: -15.99,
      type: "expense",
      date: "2023-12-31",
      category: "Entertainment",
    },
    {
      id: 6,
      description: "Coffee Shop",
      amount: -8.5,
      type: "expense",
      date: "2023-12-30",
      category: "Food",
    },
  ]

    return (
        <Card className="flex-auto bg-card border-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground text-lg font-semibold">
                    <Clock1 className="h-5 w-5"/>
                    Recent Transactions (Last 7 days)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                                <div className={`p-1 rounded-full items-center ${transaction.type === "INCOME" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
                                    {transaction.type === "INCOME" ? (
                                        <ArrowDownRight className="h-4 w-4"/>
                                    ) : (
                                        <ArrowUpRight className="h-4 w-4" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium text-foreground">
                                        {transaction.description}
                                    </div>
                                    <Badge variant="outline" className="items-center text-xs">
                                            {transaction.category}
                                    </Badge>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`font-semibold ${transaction.type === "INCOME" ? "text-success" : "text-foreground"}`}>
                                    {transaction.type === "INCOME" ? "+" : ""}
                                    ${(transaction.amount).toLocaleString()}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {format(transaction.date, "PPP")}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}