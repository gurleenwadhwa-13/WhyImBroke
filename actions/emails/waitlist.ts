"use server"

import { getResendClient, resend_audience_id } from "@/lib/resend";
import { WaitlistEmail } from "@/components/Email/waitlist-email-template";
import db from "@/lib/prisma";

interface WaitlistSubmission {
  email: string
  timestamp: Date
}

export async function submitToWaitlist(email: string) {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address")
  }

  const resend = getResendClient();

  try {
    // Save to your database (Supabase, Neon, etc.)
    //Case 1: Check if the user already exists, if it exists we send a success:false and return you have already registered for the waitlist, thank you.
    const existingEntry = await db.waitlistEntry.findUnique({
      where: {email}
    })

    if(existingEntry){
      return {
        success: true,
        message: "Email already registered in waitlist",
      }
    }

    //Running a transaction for creating DB entry + Resend operations to make sure everything succeeds.
    const result = await db.$transaction(async(tx) => {

      // First transaction step: If this is a new email, only then we save its details in the DB and create a new DB entry under the table `waitlist_entries`.
      const new_waitlist_user = await tx.waitlistEntry.create({
        data: {
          email,
          resendAudienceId: resend_audience_id
        },
      });

      //Add contact to resend audience:
      let newContact;
      try {
        newContact = await resend.contacts.create({
          email,
          audienceId: resend_audience_id as string
        });
      } catch (err) {
        // Force rollback if Resend fails
      throw new Error(`Resend contact creation failed: ${(err as Error).message}`);
      }

      console.log("new contact created below");
      console.log(newContact);

      //We now update our db entry with the resendContactId and more details
      await tx.waitlistEntry.update({
        where: { id: new_waitlist_user.id },
        data: {resendContactId: newContact.data?.id ?? null}
      });

      return new_waitlist_user;
    })

    // 2. Add this as a contact to the resend audience.

    await resend.emails.send({
      from: 'WhyImBroke <welcome@marketing.whyimbroke.tech>',
      to: [email],
      subject: "You're on the waitlist! 🔥",
      react: WaitlistEmail({ email }),
    });

    return { success: true, message: "Successfully joined waitlist!" }
  } catch (error) {
    console.error("Waitlist error details:", JSON.stringify(error, null, 2));
    throw new Error("Failed to join waitlist. Please try again.")
  }
}
