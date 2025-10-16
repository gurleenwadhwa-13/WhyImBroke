"use server"

import { FetchAccounts } from "../account/fetch-account";
import { fetchTransactions } from "../transactions/fetch-transactions";
import { Expense_Category, MonthlySpendingData } from "@/lib/types/transaction";
import { EXPENSE_CATEGORIES } from "@/lib/constants/constants";
import { DashboardSummaryResponse } from "@/lib/types/dashboard";

export default async function getDashboardSummary(): Promise<DashboardSummaryResponse> {
    try {
        const { data: accounts } = await FetchAccounts()
        const {data: recentTransactionsData} = await fetchTransactions("30");
        const {data: lastweekTransactionsData} = await fetchTransactions("7");

        //Finding networth
        let networth = 0;
        accounts.forEach((account) => {
            networth += Number(account.balance);
        });

        // finding monthly income:
        let monthly_income = 0;
        let monthly_expense = 0;

        recentTransactionsData.forEach( async (tx) => {
            if(tx.type === "EXPENSE"){
                monthly_expense += Number(tx.amount);
            }else {
                monthly_income += Number(tx.amount);
            }
        })

        const incomeCount = recentTransactionsData.filter(t => t.type === "INCOME").length;
        const expenseCount = recentTransactionsData.filter(t => t.type === "EXPENSE").length;

        //data for pie chart.
        const category_totals: Partial<Record<Expense_Category, number>> = {};
        for (const tx of recentTransactionsData){
            if (tx.type === "EXPENSE" && EXPENSE_CATEGORIES.includes(tx.category as Expense_Category)) {
                const category = tx.category as Expense_Category
                category_totals[category] = (category_totals[category] ?? 0) + Number(tx.amount)
            }
        }

        // format for chart
        const categorySpendingData: MonthlySpendingData[] = Object.entries(category_totals).map(
            ([category, total]) => ({
                category: category as Expense_Category,
                amount: total ?? 0,
            })
        );

        const metrics = {
            networth,
            monthly_expense,
            monthly_income,
            no_of_expense_tx_count: incomeCount,
            no_of_income_tx_count: expenseCount,
            lastweekTransactionsData,
            categorySpendingData
        }

        //find total balance of each bank account of the user.
        return {success: true, data: { metrics }}

    } catch (error) {
        console.error("Error in fetching Dashboard Data, check server action - getDashboardSummary", error);
        return { success: false, error: "Failed to get dashboard summary" };
    }
}