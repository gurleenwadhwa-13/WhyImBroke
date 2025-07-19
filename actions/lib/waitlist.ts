"use server"

import { getResendClient } from "@/lib/resend";
import { render } from "@react-email/render";
import { WaitlistEmail } from "@/components/Email/waitlist-email-template";
import { toast } from "sonner";

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

  try {
    // Here you would typically:
    // 1. Save to your database (Supabase, Neon, etc.)
    // 2. Add to email marketing service (Mailchimp, ConvertKit, etc.)

    const resend = getResendClient();

    const data = await resend.emails.send({
      from: 'WhyImBroke <noreply@marketing.whyimbroke.tech>',
      to: [email],
      subject: "You're on the waitlist! 🔥",
      react: WaitlistEmail({ email }),
    });

    return { success: true, message: "Successfully joined waitlist!" }
  } catch (error) {
    throw new Error("Failed to join waitlist. Please try again.")
  }
}
