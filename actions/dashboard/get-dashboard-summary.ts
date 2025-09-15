"use server"

import { auth } from "@clerk/nextjs/server"
import db  from "@/lib/prisma";
import { FetchAccounts } from "../account/fetch-account";
import { serializePrisma } from "@/lib/helpers/prisma-helpers";
import { getTransactions } from "../transactions/fetch-transactions";

export default async function getDashboardSummary() {
    try {
        const { userId } = await auth();

        // Check if the user is logged in or not?
        if(!userId) throw new Error("UnAuthorized");

        //check if the user is a valid entry in the db
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            }
        })

        if(!user) throw new Error("User not found");

        //find the user's all accounts:
        const { data: accounts } = await FetchAccounts()

        //finding the transactions on all user accounts in the last 30 days.
        const recentTransactionsData = await getTransactions(user.id, "30");

        const lastweekTransactionsData = await getTransactions(user.id, "7");
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

        const serialized_lastweekTransactionsData = serializePrisma(lastweekTransactionsData)

        const metrics = {
            networth,
            monthly_expense,
            monthly_income,
            no_of_expense_tx_count: incomeCount,
            no_of_income_tx_count: expenseCount,
            serialized_lastweekTransactionsData
        }

        //find total balance of each bank account of the user.
        return {success: true, data: { metrics }}

    } catch (error) {
        console.error("Error in fetching Dashboard Data, check server action - getDashboardSummary", error);
        return { success: false, error: "Failed to get dashboard summary" };
    }
}