"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { TextEffect } from "@/components/ui/text-effect"
import { Button } from "@/components/ui/button"
import { AnimatedGroup } from "@/components/ui/animated-group"
import WaitlistForm from "@/components/landing-page/waitlist-form"
import TextType from "./TextEffects/TextType"
import TrueFocus from "./TextEffects/TrueFocus"

const transitionVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 1.5 },
  },
}

export default function HeroSection() {
  return (
    <main className="overflow-hidden relative bg-background">
      <div aria-hidden className="absolute inset-0 isolate opacity-65 hidden lg:block">
        <div className="w-100 h-320 -translate-y-80 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68%_69%_at_55%_31%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,transparent_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,transparent_100%)] [translate:5%_-50%]" />
      </div>

      <section className="relative pt-10 md:pt-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <TrueFocus
            className="mx-auto mt-1 max-w-4xl text-balance font-cal text-4xl font-geist bg-clip-text font-medium tracking-tighter md:text-6xl lg:mt-2"
            // className="text-4xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]"
            sentence="Stop wondering why you're broke.. Take control"
            manualMode={false}
            blurAmount={5}
            borderColor="blue"
            animationDuration={1}
            pauseBetweenAnimations={2}
          />

          <TextEffect
            per="line"
            preset="fade-in-blur"
            delay={0.5}
            as="p"
            className="mx-auto mt-8 max-w-2xl text-balance text-lg font-geist bg-clip-text font-medium tracking-tighter font-inter text-muted-foreground leading-relaxed"
          >
            Track your spending. Understand your money. Build wealth.
          </TextEffect>

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
            className="mt-6 flex flex-col items-center justify-center gap-2 md:flex-row w-full max-w-lg mx-auto"
          >
            <WaitlistForm />
          </AnimatedGroup>
        </div>

        <AnimatedGroup
          variants={{
            container: { visible: { transition: { delayChildren: 1 } } },
            ...transitionVariants,
          }}
          className="relative mt-10 md:mt-10 px-6"
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