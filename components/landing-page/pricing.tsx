"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "Track up to 100 transactions",
      "Basic expense categories",
      "Monthly spending reports",
      "Mobile app access",
      "Email support",
    ],
    buttonText: "Free Forever",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "Best for individuals",
    features: [
      "Unlimited transactions",
      "Advanced analytics",
      "Custom categories",
      "Budget alerts",
      "Investment tracking",
      "Priority support",
    ],
    buttonText: "Coming Soon",
    popular: true,
  },
  {
    name: "Family",
    price: "$19",
    period: "/month",
    description: "Best for families",
    features: [
      "Everything in Pro",
      "Up to 6 family members",
      "Shared budgets",
      "Family financial goals",
      "Advanced security",
      "Financial advisor access",
    ],
    buttonText: "Coming Soon",
    popular: false,
  },
]

const Pricing = () => {
  return (
    <section className="py-24" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Choose your <span className="gradient-title">financial freedom</span> plan
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start your journey to better financial health with plans designed to grow with your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              viewport={{ once: true }}
              className={`pricing-card p-8 relative ${plan.popular ? "popular" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <Button className={`w-full mb-8 ${plan.popular ? "btn-primary" : "btn-secondary"}`}>
                {plan.buttonText}
              </Button>

              <div>
                <h4 className="text-white font-semibold mb-4">Features</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check size={16} className="text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
