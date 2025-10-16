import React from 'react'
import { PieChartLabel } from '../ui/piechart-label'
import { ChartConfig } from "@/components/ui/chart"
import { MonthlySpendingData } from '@/lib/types/transaction'

const chartConfig = {
  amount: {
    label: "Amount"
  },
  housing: {
    label: "Housing",
    color: "var(--chart-1)"
  },
  transportation: {
    label: "Transportation",
    color: "var(--chart-2)",
  },
  groceries: {
    label: "Groceries",
    color: "var(--chart-3)",
  },
  utilities: {
    label: "Utilities",
    color: "var(--chart-4)",
  },
  entertainment: {
    label: "Entertainment",
    color: "var(--chart-5)",
  },
  food: {
    label: "Food",
    color: "var(--chart-6)"
  },
  shopping: {
    label: "Shopping",
    color: "var(--chart-7)",
  },
  healthcare: {
    label: "Healthcare",
    color: "var(--chart-8)",
  },
  education: {
    label: "Education",
    color: "var(--chart-9)",
  },
  personal: {
    label: "Personal",
    color: "var(--chart-10)",
  },
  travel: {
    label: "Travel",
    color: "var(--chart-11)",
  },
  insurance: {
    label: "Insurance",
    color: "var(--chart-12)",
  },
  gifts: {
    label: "Gifts and Donations",
    color: "var(--chart-13)",
  },
  bills: {
    label: "Bills and Fees",
    color: "var(--chart-14)",
  },
  otherExpenses: {
    label: "Other Expenses",
    color: "var(--chart-15)",
  }
} satisfies ChartConfig

interface MonthlySpendingDataProps {
  categoryData?: MonthlySpendingData[]
}

export const MonthlySpendingPieChart = ({ categoryData } : MonthlySpendingDataProps) => {
  if (!categoryData?.length) return null

  // Dynamically add colors to match config
  const PieChartData: MonthlySpendingData[] = categoryData?.map((item) => ({
    ...item,
    fill: `var(--color-${item?.category.toLowerCase()})`,
  }))

  return (
    <div className='flex mx-auto flex-auto rounded-lg h-117.5 space-y-3'>
      <div className='w-full h-full'>
          <PieChartLabel
            title="Monthly Spending"
            description="January - June 2024"
            chartData={PieChartData}
            chartConfig={chartConfig}
            dataKey="amount"
            nameKey="category"
          />
      </div>
    </div>
  )
}