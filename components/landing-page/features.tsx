"use client"

import { motion } from "framer-motion"
import { Clock, Target, BarChart3, Calendar, Shield, Users } from "lucide-react"

const featuresData = [
  {
    icon: <Clock size={32} className="text-green-500" />,
    title: "Expense Tracking",
    description: "Automatically categorize and track all your expenses with smart AI-powered insights.",
  },
  {
    icon: <Target size={32} className="text-green-500" />,
    title: "Budget Planning",
    description: "Set realistic budgets and get alerts when you're approaching your limits.",
  },
  {
    icon: <BarChart3 size={32} className="text-green-500" />,
    title: "Financial Analytics",
    description: "Understand your spending patterns with detailed charts and insights.",
  },
  {
    icon: <Calendar size={32} className="text-green-500" />,
    title: "Goal Setting",
    description: "Set and track financial goals with personalized recommendations.",
  },
  {
    icon: <Shield size={32} className="text-green-500" />,
    title: "Bank-level Security",
    description: "Your financial data is protected with enterprise-grade encryption.",
  },
  {
    icon: <Users size={32} className="text-green-500" />,
    title: "Family Sharing",
    description: "Share budgets and expenses with family members for better coordination.",
  },
]

const Features = () => {
  return (
    <section className="py-24" id="features">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Master your money with <span className="gradient-title">powerful tools</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our comprehensive suite of financial tools helps you track, analyze, and optimize your spending for better
            financial health.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              viewport={{ once: true }}
              className="feature-card p-8"
            >
              <div className="space-y-4">
                <div>{feature.icon}</div>
                <h3 className="font-semibold text-xl text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
