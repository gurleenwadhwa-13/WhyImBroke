import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Types
interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date | string;
  category?: string;
}

interface TopTransactionsDonutProps {
  transactions: Transaction[];
  topN?: number;
  title?: string;
  description?: string;
}

// Color palette with high contrast and accessibility
const CHART_COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Teal
  '#FFBB28', // Orange
  '#FF8042', // Red-Orange
  '#8884D8', // Purple
  '#82CA9D', // Green
  '#FFC658', // Yellow
  '#FF6B9D', // Pink
  '#8DD1E1', // Light Blue
  '#D084D0', // Orchid
];

// Utility functions
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const isWithinLastMonth = (date: Date | string): boolean => {
  const transactionDate = new Date(date);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return transactionDate >= thirtyDaysAgo;
};

const truncateText = (text: string, maxLength: number = 25): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0 && payload[0]?.payload) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1">
          {data.fullDescription || 'Transaction'}
        </p>
        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {formatCurrency(data.value || 0)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {data.percentage || '0'}% of top expenses
        </p>
      </div>
    );
  }
  return null;
};

// Custom Legend Component
const CustomLegend = ({ payload }: any) => {
  if (!payload || !Array.isArray(payload) || payload.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-col gap-2 mt-4 max-h-48 overflow-y-auto">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-sm flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-700 dark:text-gray-300 truncate">
            {entry.payload?.fullDescription || entry.value || 'Unknown'}
          </span>
          <span className="text-gray-900 dark:text-gray-100 font-medium ml-auto flex-shrink-0">
            {formatCurrency(entry.payload?.value || 0)}
          </span>
        </div>
      ))}
    </div>
  );
};

// Main Component
export default function TopTransactionsDonut({
  transactions = [],
  topN = 5,
  title = 'Top Monthly Transactions',
  description = 'Highest spending transactions from the last 30 days',
}: TopTransactionsDonutProps) {
  const chartData = useMemo(() => {
    // Guard against undefined/null transactions
    if (!transactions || !Array.isArray(transactions)) {
      return [];
    }

    // Filter transactions from last 30 days
    const recentTransactions = transactions.filter((t) =>
      isWithinLastMonth(t.date)
    );

    // Sort by amount (descending) and take top N
    const topTransactions = recentTransactions
      .sort((a, b) => b.amount - a.amount)
      .slice(0, topN);

    // Calculate total for percentage
    const total = topTransactions.reduce((sum, t) => sum + t.amount, 0);

    // Format data for chart
    return topTransactions.map((transaction, index) => ({
      name: truncateText(transaction.description),
      fullDescription: transaction.description,
      value: transaction.amount,
      percentage: total > 0 ? ((transaction.amount / total) * 100).toFixed(1) : '0',
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));
  }, [transactions, topN]);

  const totalAmount = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">No transactions found</p>
              <p className="text-sm">No transactions in the last 30 days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Total Amount Display */}
          <div className="text-center pb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Top Expenses</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(totalAmount)}
            </p>
          </div>

          {/* Donut Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
                label={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Custom Legend */}
          <CustomLegend payload={chartData} />
        </div>
      </CardContent>
    </Card>
  );
}

// Example usage with mock data
function DemoWrapper() {
  const mockTransactions: Transaction[] = [
    { id: '1', description: 'Rent Payment', amount: 2500, date: new Date(2025, 9, 1) },
    { id: '2', description: 'Car Insurance Premium', amount: 450, date: new Date(2025, 9, 5) },
    { id: '3', description: 'Grocery Shopping - Whole Foods', amount: 287.50, date: new Date(2025, 9, 10) },
    { id: '4', description: 'Electric Bill', amount: 156.78, date: new Date(2025, 9, 15) },
    { id: '5', description: 'Restaurant Dinner', amount: 142.33, date: new Date(2025, 9, 20) },
    { id: '6', description: 'Gas Station', amount: 65.20, date: new Date(2025, 9, 22) },
    { id: '7', description: 'Coffee Shop', amount: 23.50, date: new Date(2025, 9, 25) },
    { id: '8', description: 'Online Shopping', amount: 89.99, date: new Date(2025, 9, 28) },
  ];

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <TopTransactionsDonut
          transactions={mockTransactions} 
          topN={5}
        />
      </div>
    </div>
  );
}