"use server"

import { currentUser } from "@clerk/nextjs/server"
import db from "@/lib/prisma";

export const checkUser = async () => {
  let user

  try {
    user = await currentUser()
  } catch (err) {
    console.warn("Clerk currentUser() failed — likely no middleware match", err)
    return null
  }

  if (!user) return null

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    })

    if (loggedInUser) return loggedInUser

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim()

    await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageURL: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    })

    // Optionally return the newly created user if needed:
    return await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    })
  } catch (error) {
    console.error("DB Error in checkUser():", error)
    return null
  }
}
