"use server"

import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreateTransactionType = Prisma.TransactionUncheckedCreateInput

export default async function CreateTransactions (data: CreateTransactionType) {
    try {
        //Check user, find account
        const { userId } = await auth();
        if(!userId) throw new Error("UnAuthorized");

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            }
        })

        if(!user) throw new Error("User not found");

        //Check if the provided accountId is a valid account in our db against this same userId
        const userAccount = await db.account.findUnique({
            where: {
                id: data.accountId,
                userId: user.id,
            }
        })

        if (!userAccount) throw new Error("Account not found or unauthorized");

        const transaction = await db.transaction.create({
            data: {
                ...data,
                userId: user.id,
                accountId: data.accountId
            }
        });

        revalidatePath("/transactions");
        revalidatePath("/dashboard");

        return { success: true, message: "Transaction created successfully!" }

    } catch (error) {
        console.error("Error creating transactions:", error);
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}