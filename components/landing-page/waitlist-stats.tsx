"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Clock } from "lucide-react"

const WaitlistStats = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "2,847",
      label: "People waiting",
      color: "text-green-500",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: "156%",
      label: "Growth this month",
      color: "text-blue-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "Q2 2025",
      label: "Expected launch",
      color: "text-purple-500",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className={`${stat.color} mb-4 flex justify-center`}>{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WaitlistStats
