import { auth } from "@clerk/nextjs/server"
import { serializePrisma } from "@/lib/helpers/prisma-helpers";
import db from "@/lib/prisma";
import { startOfDay, endOfDay } from 'date-fns';

export async function fetchTransactions(interval?: string | number) {
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

        // Get all account IDs for this user
        const userAccounts = await db.account.findMany({
            where: {
                userId: user.id
            },
            select: {
                id: true
            }
        });

        const accountIds = userAccounts.map(account => account.id);

        // Build the where clause conditionally
        const whereClause: any = {
            userId: user.id,
            accountId: {
                in: accountIds
            }
        };

        // Add date filtering only if interval is provided and not empty
        if (interval && interval !== "" && interval !== "0") {
            const endDate = new Date();
            const startDate = new Date();
            const days = typeof interval === 'string' ? parseInt(interval) : interval;

            if (!isNaN(days) && days > 0) {
                startDate.setDate(endDate.getDate() - days);

                const normalizedStartDate = startOfDay(startDate);
                const normalizedEndDate = endOfDay(endDate);

                whereClause.date = {
                    gte: normalizedStartDate,
                    lte: normalizedEndDate,
                };
            }
        }

        // Fetch transactions for all user accounts
        const transactions = await db.transaction.findMany({
            where: whereClause,
            orderBy: {
                date: 'desc'
            },
            include: {
                account: true // Include account details if needed
            }
        });

        const serializedTransactions = serializePrisma(transactions);
        return {success: true, data: serializedTransactions};

    } catch (error) {
        console.error("Error fetching recent transactions:", error);
        throw error;
    }
}