"use client"

import { useMemo, useState } from "react"
import { type Transaction } from "@/lib/generated/prisma"
import { endOfDay, format, startOfDay, subDays } from "date-fns"

// UI element imports
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SectionCards } from "./section-cards"

const DATE_RANGES = {
  "7D": {label: "Last 7 Days", days: 7},
  "1M": {label: "Last Month", days: 30},
  "3M": {label: "Last 3 Months", days: 90 },
  "6M": {label: "Last 6 Months", days: 180},
  ALL: {label: "All Time", days: null},
}

type DateRangeKeys = "7D" | "1M" | "3M" | "6M" | "ALL";

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
  expense: {
    label: "Expense",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function AccountBarChart({transactions}:{ transactions: Transaction[]}) {
  const [dateRange, setDateRange] = useState<DateRangeKeys>("1M");

  const filteredTransactions = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    //Filtering transactions within the date range
    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    )

    const grouped = filtered.reduce((acc: Record<string, { date: string; income: number; expense: number }>, transaction) => {

      //We first format the date here:
      const date = format(new Date(transaction.date), "MMM dd");

      //We then need to check if the following date key exists, if not add it to acc array.
      if(!acc[date]){
        acc[date] = { date, income: 0, expense: 0};
      }

      // Depending upon if its expense or income, we run our sum function here?
      if(transaction.type === "INCOME"){
        acc[date].income += Number(transaction.amount);
      }else{
        acc[date].expense += Number(transaction.amount);
      }

      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  }, [dateRange, transactions])

  const totalAccountChanges = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredTransactions]);

  const handleDateRange = useMemo(() => {
    let transactionsInRange = [...filteredTransactions];
  }, [])

  return (
    <div className="container mx-auto pt-0 p-2">
    <Card>
      <CardHeader>
          <div className="flex items-center justify-between">
          <CardTitle>Transactions Overview</CardTitle>
          <Select defaultValue={dateRange} onValueChange={(value: DateRangeKeys) => setDateRange(value)}>
            <SelectTrigger className="w-[145px]">
              <SelectValue placeholder="Select a date range" />
            </SelectTrigger>
              <SelectContent>{Object.entries(DATE_RANGES).map(([key, {label}]) => {
                return (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          </div>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>

      <SectionCards totalIncome={totalAccountChanges.income} totalExpense={totalAccountChanges.expense} />

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[100px] w-full">
          <BarChart accessibilityLayer data={filteredTransactions}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 7)}
            />
            <YAxis/>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="income" fill="var(--chart-1)" radius={[4, 4, 0, 0]}/>
            <Bar dataKey="expense" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
    </div>
  )
}


export default AccountBarChart