import db from "@/lib/prisma";
import { startOfDay, endOfDay } from 'date-fns';

export async function getTransactions(userId: string, interval: "7" | "30") {
    try {
        // Get all account IDs for this user
        const userAccounts = await db.account.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true
            }
        });

        const accountIds = userAccounts.map(account => account.id);

        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - Number(interval));

        const normalizedStartDate = startOfDay(startDate);
        const normalizedEndDate = endOfDay(endDate);

        // Fetch transactions for all user accounts within date range
        const transactions = await db.transaction.findMany({
            where: {
                userId: userId,
                accountId: {
                    in: accountIds
                },
                date: {
                    gte: normalizedStartDate,
                    lte: normalizedEndDate,
                }
            },
            orderBy: {
                date: 'desc'
            },
            include: {
                account: true // Include account details if needed
            }
        });

        return transactions;

    } catch (error) {
        console.error("Error fetching recent transactions:", error);
        throw error;
    }
}