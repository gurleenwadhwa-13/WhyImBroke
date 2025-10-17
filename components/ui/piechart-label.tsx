"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { MonthlySpendingData, } from "@/lib/types/transaction";
import { EXPENSE_CATEGORIES } from "@/lib/constants/constants"

export const description = "A pie chart with a label"

interface PieChartLabelProps {
  title?: string,
  description?: string,
  chartData?: MonthlySpendingData[],
  chartConfig: ChartConfig,
  dataKey: string,
  nameKey: string,
  footer?: React.ReactNode,
}

export function PieChartLabel({
  title = "Insert A title",
  description = "Insert a Description",
  chartData,
  chartConfig,
  dataKey,
  nameKey,
  footer,
}: PieChartLabelProps) {
  return (
    <Card className="flex flex-col w=full h-full pt-10">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 justify-around">
        <ChartContainer
          config={chartConfig}
          className="flex [&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-video max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[150px]"
                />
              }
              labelClassName="h-8 w-35"
            />
            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              labelLine={true}
              label={({ value }) => `$${value.toLocaleString()}`}
              className="font-semibold text-muted"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className="flex-col gap-2 text-sm">{footer}</CardFooter>
      )}
    </Card>
  )
}