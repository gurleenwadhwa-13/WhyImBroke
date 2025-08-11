"use server"

import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Decimal } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export default async function deleteTransactions (transactionsIds: string[]) {
    console.log("Inside the deleteTransactions() server action");
    console.log("Printing the output of Transactions Ids:");
    console.log(transactionsIds);

    try {
        // Find userId from clerk auth.
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");

        // Check if this userId is associated with any user account in db.
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            }
        })

        if(!user) throw new Error("User not found");

        //finding the transactions:
        const transactions = await db.transaction.findMany({
            where: {
                id: {in: transactionsIds},
                userId: user.id,
            }
        })

        // Check if this user has any active accounts?
        const accountBalanceChanges = transactions.reduce((acc: Record<string, Decimal>, transaction) => {
            const change = (transaction.type === "EXPENSE") ? transaction.amount : -transaction.amount;

            if(!acc[transaction.accountId]) {
                acc[transaction.accountId] = new Decimal(0);
            }

            // Whats happening here?
            // Ans. We're keeping track of how each transaction affects each account,
            //      although not needed here since we are just changing for one account here, but helpful for future iterations.
            acc[transaction.accountId] = acc[transaction.accountId].plus(change);
            console.log(acc);
            return acc;
        }, {});

        //Starting a prisma transactions process
        await db.$transaction(async (tx) => {
            //In this first step of transaction, we first delete all records where 
            await tx.transaction.deleteMany({
                where: {
                    id: {in : transactionsIds},
                    userId: user.id,
                }
            });

            //We tracked changes to the accounts, now we gotta apply those changes.
            for(const [accountId, balanceChange] of Object.entries(accountBalanceChanges)){
                await tx.account.update({
                    where: { id: accountId },
                    data: {
                        balance: {
                            increment: balanceChange,
                        }
                    }
                })
            }
        })

        revalidatePath("/dashboard");
        revalidatePath("/account/[id]");

        return {success: true, message: "Deleted Transactions Successfully!"};

    }catch(error: unknown){
        console.error("Error deleting transactions");
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

