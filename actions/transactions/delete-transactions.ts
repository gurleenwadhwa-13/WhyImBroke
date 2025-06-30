"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function deleteTransactions (transactionsIds: string[]) {
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

        // Check if this user has any active accounts?
        const existingAccounts = await db.account.findMany({
            where: {
                userId: user.id
            }
        })

        console.log(existingAccounts);

        // Push a delete transaction instruction with a delete request.
        // const deleted

    }catch(error){
        console.error("Error deleting transactions");
        throw error;
    }
}

