// "use client"

// import { motion, type Variants } from "framer-motion"
// import { Clock, Sparkles } from "lucide-react"
// import WaitlistForm from "@/components/landing-page/waitlist-form"
// import { Clock, Sparkles } from "lucide-react"
// import { AnimatedGroup } from '@/components/ui/animated-group'
// import Image from 'next/image'

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.3,
//     },
//   },
// }

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// }

// const HeroSection = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative overflow-hidden">
//       {/* Floating background elements */}
//       <motion.div
//         className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"
//         animate={{
//           x: [0, 100, 0],
//           y: [0, -50, 0],
//         }}
//         transition={{
//           duration: 20,
//           repeat: 2,
//           ease: "linear",
//         }}
//       />
//       <motion.div
//         className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
//         animate={{
//           x: [0, -80, 0],
//           y: [0, 60, 0],
//         }}
//         transition={{
//           duration: 5,
//           repeat: 2,
//           ease: "linear",
//         }}
//       />

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="container mx-auto text-center max-w-5xl relative z-10"
//       >
//         {/* Badge */}
//         <motion.div variants={itemVariants} className="mb-8">
//           <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
//             <Sparkles className="w-4 h-4 text-green-400" />
//             <span>Take Control of Your Financial Future</span>
//           </div>
//         </motion.div>

//         {/* Main Headline */}
//         <motion.h1
//           variants={itemVariants}
//           className="scroll-m-20 text-center text-4xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-tight leading-tight text-balance"
//         >
//           Stop wondering <span className="gradient-title">why you're broke</span>
//           <br />
//           Start making <span className="gradient-title">smart money moves</span>
//         </motion.h1>

//         {/* Subtitle */}
//         <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
//           The AI-powered financial management platform that helps you track expenses, create budgets, and make informed
//           financial decisions.
//         </motion.p>

//         {/* Badge */}
//         <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 text-sm text-green-400 mb-8">
//           <Clock className="w-4 h-4" />
//           <span>Coming this Fall</span>
//         </motion.div>

//         {/* Waitlist Form */}
//         <motion.div variants={itemVariants} className="mb-16 max-w-lg mx-auto">
//           <WaitlistForm />
//         </motion.div>

//         {/* Image Section */}
//         <AnimatedGroup
//           variants={{
//             container: {
//               visible: {
//                 transition: { delayChildren: 1 },
//               },
//             },
//             item: {
//               hidden: { opacity: 0, y: 20 },
//               visible: {
//                 opacity: 1,
//                 y: 0,
//                 transition: { type: 'spring', bounce: 0.3, duration: 2 },
//               },
//             },
//           }}
//           className="relative mt-12 max-w-4xl mx-auto"
//         >
//           <Image
//             src="/images/hero-section-img.png"
//             alt="background"
//             className="w-full h-auto dark:block"
//             width={3276}
//             height={4095}
//             priority
//           />
//         </AnimatedGroup>

//         {/* Feature Preview Cards */}
//         {/* <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//           {[
//             { title: "Smart Tracking", desc: "AI-powered expense categorization" },
//             { title: "Budget Alerts", desc: "Real-time spending notifications" },
//             { title: "Financial Insights", desc: "Personalized money-saving tips" },
//           ].map((feature, index) => (
//             <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
//               <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-400 text-sm">{feature.desc}</p>
//             </div>
//           ))}
//         </motion.div> */}
//       </motion.div>
//     </div>
//   )
// }

// export default HeroSection

"use client"

import { motion, type Variants } from "framer-motion"
import { Clock, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import WaitlistForm from "@/components/landing-page/waitlist-form"
import { AnimatedGroup } from "@/components/ui/animated-group"
import { TextEffect } from "@/components/ui/text-effect"
import { Button } from "@/components/ui/button"

const transitionVariants: Variants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 1.5 },
    },
  },
}

export default function HeroSection() {
  return (
    <main className="overflow-hidden relative">
      {/* Layered background */}
      <div
        aria-hidden
        className="absolute inset-0 isolate opacity-65 hidden lg:block"
      >
        <div className="w-100 h-320 -translate-y-80 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68%_69%_at_55%_31%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,transparent_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <section className="relative pt-10 md:pt-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          {/* Headline */}
          <TextEffect
            preset="fade-in-blur"
            as="h1"
            speedSegment={0.3}
            className="mx-auto mt-1 max-w-4xl text-balance text-5xl font-medium md:text-7xl lg:mt-2 xl:text-[5.25rem]"
          >
            Stop wondering why you're broke.
          </TextEffect>

          {/* Subtitle */}
          <TextEffect
            per="line"
            preset="fade-in-blur"
            delay={0.5}
            as="p"
            className="mx-auto mt-8 max-w-2xl text-balance text-lg text-gray-400 leading-relaxed"
          >
            Track your spending. Understand your money. Build wealth.
          </TextEffect>

          {/* CTA Row
          <motion.div variants={transitionVariants} initial="hidden" animate="visible" className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="bg-foreground/10 rounded-xl border p-0.5">
              <Button asChild size="lg" className="rounded-xl px-5 text-base">
                <Link href="#waitlist">Join the Waitlist</Link>
              </Button>
            </div>
            <Button size="lg" variant="ghost" className="rounded-xl px-5">
              <Link href="#demo">Request a Demo</Link>
            </Button>
          </motion.div> */}

          {/* Waitlist Form */}
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
            className="mt-8 flex flex-col items-center justify-center gap-2 md:flex-row w-full mx-auto"
          >
            <WaitlistForm/>
          </AnimatedGroup>
        </div>

        {/* Product Preview */}
        <AnimatedGroup
          variants={{
            container: { visible: { transition: { delayChildren: 1 } } },
            ...transitionVariants,
          }}
          className="relative mt-12 md:mt-20 px-6"
        >
          <div className="inset-shadow-2xs bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1 ring-border">
            <Image
              className="aspect-[15/11] relative rounded-2xl bg-background"
              src="/images/hero-section-img.png"
              alt="App preview"
              width={2700}
              height={2040}
            />
          </div>
        </AnimatedGroup>
      </section>
    </main>
  )
}