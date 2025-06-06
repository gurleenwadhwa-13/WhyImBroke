"use server"

import { Prisma } from "@/lib/generated/prisma"
import { serializePrisma } from "@/lib/helpers/prisma-helpers";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

type CreateAccountInputType = Prisma.AccountCreateInput

export async function createAccount(data: CreateAccountInputType){
    try {
        // Check if the user is logged in or not?
        const { userId } = await auth();
        console.log(userId);
        if(!userId) throw new Error("UnAuthorized");

        //check if the user is a valid entry in the db
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            }
        })

        if(!user) throw new Error("User not found");

        const balanceFloat = parseFloat(data.balance?.toString() ?? "0");
        console.log(balanceFloat);
        if(isNaN(balanceFloat)){
            throw new Error("Invalid balance amount")
        }

        // If the user is logged in and the balance is converted to Float.
        // We can now search if the user has any other accounts.
        const existingAccounts = await db.account.findMany({
            where: { userId: user.id }
        })

        console.log("existingAccount: \n" + existingAccounts);

        const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

        /** [Managing Default Accounts]: This if statement only runs when:
         * The user is creating a new account and hence we want it to be a default
         * OR
         * This new account is the new default account and all other accounts need to be default=false.
         */
        if(shouldBeDefault){
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true},
                data: { isDefault: false}
            })
        }

        // We can now finally create a new account since we have all the required info
        const newAccount = await db.account.create({
            data: {
                ...data,
                // userId: user.id,
                balance: balanceFloat,
                isDefault: shouldBeDefault
            }
        })

        return serializePrisma( newAccount);


    } catch (error) {
        console.log(error)
    }
}