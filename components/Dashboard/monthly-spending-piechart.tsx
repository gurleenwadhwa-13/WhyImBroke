import React from 'react'
import { PieChartLabel } from '../ui/piechart-label'
import {  ChartConfig } from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export const MonthlySpendingPieChart = () => {
  return (
    <div className='flex-auto rounded-lg'>
        {/* <div className='h-64 flex items-center justify-center text-muted-foreground'>
            <div className='w-full h-full'> */}
                <PieChartLabel
                  title="Monthly Spending"
                  description="January - June 2024"
                  chartData={chartData}
                  chartConfig={chartConfig}
                  dataKey="visitors"
                  nameKey="category"
                />
            {/* </div>
        </div> */}
    </div>
  )
}