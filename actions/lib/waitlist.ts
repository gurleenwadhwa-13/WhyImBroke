"use server"

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
    // 3. Send confirmation email

    // For now, we'll just log it
    console.log("Waitlist submission:", { email, timestamp: new Date() })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, message: "Successfully joined waitlist!" }
  } catch (error) {
    console.error("Waitlist submission error:", error)
    throw new Error("Failed to join waitlist. Please try again.")
  }
}
