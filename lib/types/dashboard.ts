import { MonthlySpendingData } from "./transaction";
import { Transaction } from "@prisma/client";

export interface DashboardMetrics {
  networth: number;
  monthly_expense: number;
  monthly_income: number;
  no_of_expense_tx_count: number;
  no_of_income_tx_count: number;
  lastweekTransactionsData: Transaction[];
  categorySpendingData?: MonthlySpendingData[];
}

export interface DashboardSummaryResponse {
  success: boolean;
  data?: {
    metrics: DashboardMetrics;
  };
  error?: string;
}
