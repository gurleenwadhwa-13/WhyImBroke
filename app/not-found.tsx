"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[100vh] px-4 text-center'>
        <h1 className='text-6xl font-bold gradient-title mb-4'>404</h1>
        <h2 className='text-2xl font-semibold mb-10'>Page Not Found</h2>
        <p className='text-gray-600 mb-8'>Oops! The Page you&apos;re looking for doesn&apos;t exist or has been moved. Please visit the Home Page.</p>
        <SignedOut>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </SignedOut>

        <SignedIn>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </SignedIn>
    </div>
  )
}

export default NotFoundPage