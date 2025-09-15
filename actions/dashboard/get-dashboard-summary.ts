"use server"

import { auth } from "@clerk/nextjs/server"
import db  from "@/lib/prisma";
import { FetchAccounts } from "../account/fetch-account";
import { serializePrisma } from "@/lib/helpers/prisma-helpers";
import { fetchTransactions } from "../transactions/fetch-transactions";

export default async function getDashboardSummary() {
    try {

        //find the user's all accounts:
        const { data: accounts } = await FetchAccounts()

        //finding the transactions on all user accounts in the last 30 days.
        const {data: recentTransactionsData} = await fetchTransactions("30");

        const {data: lastweekTransactionsData} = await fetchTransactions("7");
        console.log("Last weeks data");
        console.log(lastweekTransactionsData);

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

        const metrics = {
            networth,
            monthly_expense,
            monthly_income,
            no_of_expense_tx_count: incomeCount,
            no_of_income_tx_count: expenseCount,
            lastweekTransactionsData
        }

        //find total balance of each bank account of the user.
        return {success: true, data: { metrics }}

    } catch (error) {
        console.error("Error in fetching Dashboard Data, check server action - getDashboardSummary", error);
        return { success: false, error: "Failed to get dashboard summary" };
    }
}