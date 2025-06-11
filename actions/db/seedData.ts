"use server";

import { Prisma, TransactionType } from "@/lib/generated/prisma";
import { db } from "@/lib/prisma";
import { subDays } from "date-fns";

// Replace with your actual types if using Prisma schema enums
type TransactionStatus = "COMPLETED";

const ACCOUNT_ID = "edf0d911-f1b2-4564-8ad9-0f5c6ac33436";
const USER_ID = "9415796a-33b0-40fd-b724-3a825f8cbbb0";

type CategoryDefinition = {
  name: string;
  range: [number, number];
};

const CATEGORIES: Record<TransactionType, CategoryDefinition[]> = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "transportation", range: [100, 500] },
    { name: "groceries", range: [200, 600] },
    { name: "utilities", range: [100, 300] },
    { name: "entertainment", range: [50, 200] },
    { name: "food", range: [50, 150] },
    { name: "shopping", range: [100, 500] },
    { name: "healthcare", range: [100, 1000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
  ],
};

// type Transaction = {
//   id: string;
//   type: TransactionType;
//   amount: number;
//   description: string;
//   date: Date;
//   category: string;
//   status: TransactionStatus;
//   userId: string;
//   accountId: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

type Transaction = Prisma.TransactionCreateManyInput;

function getRandomAmount(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomCategory(type: TransactionType): { category: string; amount: number } {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions(): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const transactions: Transaction[] = [];
    let totalBalance = 0;

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        const type: TransactionType = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const transaction: Transaction = {
          id: crypto.randomUUID(),
          type,
          amount,
          description: `${type === "INCOME" ? "Received" : "Paid for"} ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId: USER_ID,
          accountId: ACCOUNT_ID,
          createdAt: date,
          updatedAt: date,
          recurringInterval: "NONE"
        };

        totalBalance += type === "INCOME" ? amount : -amount;
        transactions.push(transaction);
      }
    }

    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany({
        where: { accountId: ACCOUNT_ID },
      });

      await tx.transaction.createMany({
        data: transactions,
      });

      await tx.account.update({
        where: { id: ACCOUNT_ID },
        data: { balance: totalBalance },
      });
    });

    return {
      success: true,
      message: `Created ${transactions.length} transactions`,
    };
  } catch (error) {
    console.error("Error seeding transactions:", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}
