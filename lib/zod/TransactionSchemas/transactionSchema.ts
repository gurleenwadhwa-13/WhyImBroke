import { z } from "zod"
import { TransactionType, RecurringIntervalList } from "@prisma/client";

const income_categories = ["salary", "freelance", "investments", "other income"];
const expense_categories = ["housing", "transportation", "groceries", "entertainment", "food", "shopping", "healthcare", "education", "travel"];

export const TransactionInputSchema = z.object({
  type: z.enum(TransactionType),
  date: z.date(),
  amount: z.string().min(1, "Transaction should be at least $1"),
  description: z.string().optional(),
  category: z.enum([...income_categories, ...expense_categories] as const),
  isRecurring: z.boolean(),
  recurringInterval: z.enum(RecurringIntervalList).optional(),
  accountId: z.string(),
});

export type TransactionInputSchemaType = z.infer<typeof TransactionInputSchema>