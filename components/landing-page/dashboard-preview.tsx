"use client"

import { motion } from "framer-motion"
import { TrendingUp, CreditCard, Target, BarChart3 } from "lucide-react"

const DashboardPreview = () => {
  const stats = [
    { label: "Total Balance", value: "$4,250.00", icon: <TrendingUp size={20} className="text-green-500" /> },
    { label: "This Month", value: "$1,890.50", icon: <CreditCard size={20} className="text-gray-400" /> },
    { label: "Budget Left", value: "$659.50", icon: <Target size={20} className="text-green-500" /> },
  ]

  const transactions = [
    { name: "Grocery Shopping", category: "Food", amount: "-$85.24", date: "Today", positive: false },
    { name: "Salary Deposit", category: "Income", amount: "+$3,200.00", date: "Dec 1", positive: true },
    { name: "Netflix Subscription", category: "Entertainment", amount: "-$15.99", date: "Dec 1", positive: false },
    { name: "Coffee Shop", category: "Food", amount: "-$4.50", date: "Yesterday", positive: false },
  ]

  return (
    <section className="py-24" id="dashboard">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Everything you need to manage your finances
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Track expenses, analyze spending patterns, set budgets, and gain insights into your financial habits with
            our comprehensive dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="dashboard-card p-8">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <BarChart3 size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Financial Dashboard</h3>
                  <p className="text-gray-400 text-sm">December 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">Spending Alert</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">On Track</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Recent Transactions */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Recent Transactions</h4>
              <div className="space-y-3">
                {transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">$</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{transaction.name}</p>
                        <p className="text-gray-400 text-sm">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.positive ? "text-green" : "text-red"}`}>
                        {transaction.amount}
                      </p>
                      <p className="text-gray-400 text-sm">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DashboardPreview
