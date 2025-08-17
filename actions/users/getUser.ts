"use server"

import { auth } from "@clerk/nextjs/server";
import db from "@/lib/prisma";
import { createUser } from "@/actions/users/createUser";

export async function getUser (){
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const existingUser = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    })

    if (!existingUser){
      return { success: true, data: await createUser()};
    }

    return { success: true, data: existingUser };
  } catch (error) {
    return { success: false, error: "User does not exist"}
  }
}
