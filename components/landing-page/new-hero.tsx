"use client"

import { motion } from "framer-motion"
import WaitlistForm from "@/components/Landing-page/waitlist-form"
import { Sparkles } from "lucide-react"

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto text-center max-w-5xl relative z-10"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span>Take Control of Your Financial Future</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
        //   className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          className="scroll-m-20 text-center text-4xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight text-balance"
        >
          Stop wondering <span className="gradient-title">why you're broke</span>
          <br />
          Start making <span className="gradient-title">smart money moves</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          The AI-powered financial management platform that helps you track expenses, create budgets, and make informed
          financial decisions.
          <strong className="text-white"> Coming soon.</strong>
        </motion.p>

        {/* Waitlist Form */}
        <motion.div variants={itemVariants} className="mb-16 max-w-lg mx-auto">
          <WaitlistForm />
        </motion.div>

        {/* Trust indicators */}
        <motion.div variants={itemVariants} className="text-sm text-gray-500 mb-16">
          Free to join • Be the first to know • Special launch pricing
        </motion.div>

        {/* Feature Preview Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { title: "Smart Tracking", desc: "AI-powered expense categorization" },
            { title: "Budget Alerts", desc: "Real-time spending notifications" },
            { title: "Financial Insights", desc: "Personalized money-saving tips" },
          ].map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection
