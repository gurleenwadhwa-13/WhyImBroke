"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"

const HeroSection = () => {
  return (
    <div className="pb-20 px-4">
        <div>
            <h1>Manage your finances</h1>
            <p>
                An AI Powered financial management platform that helps you track, analyze and optimize your spending with real-time insights.
            </p>
            <div>
                <Link href={"/dashboard"}>
                    <Button size="lg" className="px-8 mr-2">
                        Get Started
                    </Button>
                </Link>

                <Link href={"https://gurleenwadhwa.dev"}>
                    <Button variant={"outline"} size="lg" className="px-8">
                        Contact Developer
                    </Button>
                </Link>
            </div>
            <div className="flex mx-auto pt-4">
                <div>
                    <Image
                        className=""
                        width={1280}
                        height={780}
                        alt="Dashboard Preview"
                        src={"/images/Hero-Section-Image.webp"}
                        priority={true}

                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection