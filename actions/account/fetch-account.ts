"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { serializePrisma } from "@/lib/helpers/prisma-helpers";

export async function FetchAccounts () {
    try {
        // Checking User Auth
        const { userId } = await auth();

        //Checking if userId received maps to any user account in our DB
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId ?? undefined
            }
        })

        if(!user || user === undefined){
            console.log("User does not exists");
            throw new Error("User does not exist");
        }

        // Searching for all user accounts
        const accounts = await db.account.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc"},
            include: { _count: {
                select: {
                    transactions: true
                }
            }}

        })

        const serializedAccount = serializePrisma(accounts)

        return {success: true, data: serializedAccount};

    } catch (error) {
        console.error("Error in fetching accounts", error);
        throw error;
    }
}

export async function getAccountWithTransactions(accountId: string) {
    try {
        // Checking User Auth
        const { userId } = await auth();

        //Checking if userId received maps to any user account in our DB
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId ?? undefined
            }
        })

        if(!user || user === undefined){
            throw new Error("User does not exist");
        }

        const accounts = await db.account.findUnique({
            where: { id: accountId, userId: user.id },
            include: {
                transactions: {
                    orderBy: { date: "desc" }
                },
                _count: {
                    select: {transactions: true}
                }
            }
        })

        if(!accounts) {
            return null;
        }

        const serializedAccounts = serializePrisma(accounts);

        return { success: true, data: {
            ...serializedAccounts,
            transactions: accounts.transactions.map(serializePrisma)
        }};
    } catch (error) {
        console.error("Error in fetching accounts with their transactions");
        throw error;
    }
}