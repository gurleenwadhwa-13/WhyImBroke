"use client"

import { motion } from "framer-motion"
import WaitlistForm from "@/components/Landing-page/waitlist-form"

import { Sparkles, Clock, Bell, Gift } from "lucide-react"

const WaitlistSection = () => {
  const benefits = [
    {
      icon: <Bell className="w-5 h-5" />,
      text: "Be the first to know when we launch",
    },
    {
      icon: <Gift className="w-5 h-5" />,
      text: "Get exclusive early access",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Special launch pricing for early supporters",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-black/20 to-black/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-sm text-green-400 mb-8">
            <Clock className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Be the first to experience
            <br />
            <span className="gradient-title">financial freedom</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of others waiting for the launch of WhyImBroke. Get notified when we're ready to help you
            take control of your finances.
          </p>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <WaitlistForm />
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-gray-300">
                <div className="text-green-500">{benefit.icon}</div>
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-sm text-gray-500"
          >
            Free to join • No spam, ever • Unsubscribe anytime
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WaitlistSection
