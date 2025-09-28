"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Mail, Users } from "lucide-react"
import { submitToWaitlist } from "@/actions/emails/waitlist"
import { toast } from "sonner"


interface WaitlistFormProps {
  onSuccess?: () => void
}

const WaitlistForm = ({ onSuccess }: WaitlistFormProps) => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [status, setStatus] = useState<"new" | "duplicate" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const result = await submitToWaitlist(email);

      if (result.status == "new"){
        setIsSubmitted(true)
        setStatus("new")
        onSuccess?.()
        toast.success("🎉 You're on the waitlist!", { position: "top-center" })
      }else if(result.status == "duplicate"){
        setIsSubmitted(true) // still show success UI
        setStatus("duplicate")
        toast.info("✅ You're already on the waitlist!", { position: "top-center" })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      toast.error("Failed to join waitlist. Please try again.", {
        position: "top-center"
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white">{status === "new" ? "You're on the list!" : "You're already on the list!"}</h3>
        <p className="text-gray-400">
          {status === "new"
            ? "Thanks for joining our waitlist. We'll notify you as soon as WhyImBroke launches!"
            : "Looks like you’ve already joined — we’ll keep you posted as soon as WhyImBroke launches!"
          }
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>You'll be among the first to know</span>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 min-w-[280px] sm:min-w-[350px] relative w-full">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="pl-10 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 h-12"
        required
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting || !email}
        className="btn-primary px-8 py-3 h-12 whitespace-nowrap disabled:opacity-50"
      >
        {isSubmitting ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Joining...</span>
        </div>
        ) : (
        "Join Waitlist"
        )}
      </Button>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm">
          {error}
        </motion.p>
      )}
    </form>
  )
}

export default WaitlistForm