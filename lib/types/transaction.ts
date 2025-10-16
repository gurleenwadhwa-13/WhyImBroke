//1. Types and Constants for Pie Chart on Dashboard
import { EXPENSE_CATEGORIES } from "../constants/constants";

export type Expense_Category = (typeof EXPENSE_CATEGORIES)[number];

export interface MonthlySpendingData {
  category: string;
  amount: number;
  fill?: string;
}
