"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { serializePrisma } from "@/lib/helpers/prisma-helpers";

export async function updateDefaultAccount (accountId: string) {
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

        //We converted all other accounts be non-Default Accounts now.
        await db.account.updateMany({
            where: { userId: user.id, isDefault: true},
            data: {isDefault: false}
        })

        const account = await db.account.update({
            where: {id: accountId, userId: user.id},
            data: {isDefault: true}
        })

        revalidatePath("/dashboard");
        return {success: true, data: serializePrisma(account)};

    } catch (error) {
        console.error("Error in fetching accounts", error);
        throw error
    }

}