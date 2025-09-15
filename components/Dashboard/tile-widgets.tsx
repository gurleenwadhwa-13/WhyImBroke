"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Define the props interface
interface TileWidgetsProps {
  description: string
  displayAmount: number | any
  thirtyDayChange?: number
  currency?: string
  locale?: string
  changeLabel?: string
  trend?: "up" | "down" | null
  className?: string
}

export function TileWidgets ({
  description,
  displayAmount,
  thirtyDayChange = 0,
  currency = 'USD',
  locale = 'en-US',
  changeLabel = '30-day change',
  trend = null,
  className = '',
}: TileWidgetsProps): React.ReactNode {

    //Some hardcoded strings, only for the placeholder times:
    const thirtyDayChangehardcoded = 12450.25
    const isPositive = thirtyDayChange > 0;
    const changePercentage = ((thirtyDayChange / (displayAmount - thirtyDayChange)) * 100).toFixed(1)

    // Format the display amount as currency
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(displayAmount)

    // Determine trend icon and color
    const getTrendIcon = () => {
        if (trend === "up") return <IconTrendingUp className="size-4" />
        if (trend === "down") return <IconTrendingDown className="size-4" />
        return null
    }

    const getTrendVariant = () => {
        if (trend === "up") return "default"
        if (trend === "down") return "destructive"
        return "outline"
    }
    return (
        <Card className={`flex flex-auto shrink bg-card border-border grow ${className}`} data-slot="card">
            <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm">{description}</CardTitle>
                <CardAction>
                    <Badge variant={getTrendVariant()}>
                        {getTrendIcon()}
                        {trend === "up" ? "+12.5%" : "5.5%"}
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="space-x-20">
                <div className="text-2xl font-bold text-foreground">{formattedAmount}</div>
                <span className="text-sm">
                    {isPositive ? "+" : ""}${Math.abs(thirtyDayChangehardcoded).toLocaleString()} ({changePercentage}%)
                </span>
                <p className="pt-4 text-xs text-muted-foreground mt-2">30-day change</p>
            </CardContent>
        </Card>
    )
}