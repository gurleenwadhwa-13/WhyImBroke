import { seedTransactions } from "@/actions/db/seedData";

export async function GET(){
    const result = await seedTransactions();
    return Response.json(result);
}