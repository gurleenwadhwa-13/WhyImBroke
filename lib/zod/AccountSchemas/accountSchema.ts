import { z } from "zod"

export const AccountInputSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.enum(["SAVINGS", "CHEQUING"]),
    currency: z.enum(["CAD", "USD","INR"]),
    balance: z.string().min(1, "Initial Balance is required"),
    isDefault: z.boolean(),
})

export type AccountInputSchemaType = z.infer<typeof AccountInputSchema>