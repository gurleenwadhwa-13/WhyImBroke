"use server"

import { serializePrisma } from "@/lib/helpers/prisma-helpers";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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

        return {success: true, data: accounts};

    } catch (error) {
        console.error("Error in fetching accounts", error);
        throw error
    }
}