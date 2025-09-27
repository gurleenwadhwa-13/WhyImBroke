"use server"

import { auth } from "@clerk/nextjs/server";
import db  from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server"

export async function createUser() {
  const user = await currentUser();

  if(!user){
    return { success: false, error: "Cannot find User, issue with Auth Provider"};
  }

  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim()

  //We grab the user details from the Clerk Auth session.
  try {
    const userAccount = await db.user.create({
        data: {
            clerkUserId: user.id,
            name,
            email: user.emailAddresses[0].emailAddress,
            imageURL: user.imageUrl
        }
    })
    revalidatePath("/dashboard");
    return { success: true, data: userAccount };
  } catch (error) {
    console.error("User creation error:", error);
    return { success: false, error: "Failed to create user" };
  }
}