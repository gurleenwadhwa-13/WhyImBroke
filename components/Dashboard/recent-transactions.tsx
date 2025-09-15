"use client"

import { ArrowDownRight, ArrowUpRight, Clock1 } from "lucide-react";
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'

type RecentTransactionType = any | undefined;

export function RecentTransactionsSummary({ transactions }: { transactions: RecentTransactionType[] }) {
    // If no transactions, show empty state
    if (!transactions || transactions.length === 0) {
        return (
            <Card className="flex-auto bg-card border-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground text-lg font-semibold">
                        <Clock1 className="h-5 w-5"/>
                        Recent Transactions (Last 7 days)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                        No recent transactions found
                    </div>
                </CardContent>
            </Card>
        )
    }

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