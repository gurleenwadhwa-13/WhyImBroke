"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import { RefObject, useEffect, useRef } from "react"

const HeroSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleScroll = ( ) => {
    const imageElement = imageRef.current;
    const scrollPosition = window.scrollY;
    const scrollThreshold = 100;

    if(scrollPosition>scrollThreshold){
        imageElement?.classList.add("scrolled");
    }else{
        imageElement?.classList.remove("scrolled");
    }
  }
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return ()=>window.removeEventListener("scroll", handleScroll);
  }, [])

    return (
    <div className="pb-20 px-4">
        <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title"
            >Manage your Finances <br /> with Intelligence</h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                An AI Powered financial management platform that helps you track, analyze and optimize your spending with real-time insights.
            </p>
            <div className="flex justify-center space-x-4">
                <Link href={"/dashboard"}>
                    <Button size="lg" className="px-8">
                        Get Started
                    </Button>
                </Link>

                <Link href={"https://gurleenwadhwa.dev"}>
                    <Button variant={"outline"} size="lg" className="px-8">
                        Contact Developer
                    </Button>
                </Link>
            </div>
            <div className="hero-image-wrapper flex mx-auto pt-4">
                <div ref={imageRef} className="hero-image">
                    <Image
                        className=""
                        width={1280}
                        height={780}
                        alt="Dashboard Preview"
                        src={"/images/hero-section-image.png"}
                        priority={true}

                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection