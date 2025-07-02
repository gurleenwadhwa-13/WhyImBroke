import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { LayoutDashboardIcon, PenBox } from 'lucide-react'
import { checkUser } from '@/lib/userAuth'

const Header = async () => {
  await checkUser();

    return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
        <nav className='container mx-auto px-1 py-1 flex items-center justify-between'>
            <Link href="/">
                <Image
                    src={"/images/main-logo.png"}
                    className='w-25 h-25 object-fill'
                    alt="brokegrad-logo"
                    width={200}
                    height={60}
                    priority
                />
            </Link>

            <div className='flex p-2 mx-2 items-center space-x-4 justify-between'>
                <SignedIn>
                    <Link href={"/dashboard"} className='flex items-center text-gray-600 hover:text-blue-600 gap-2'>
                        <Button variant={"outline"}>
                            <LayoutDashboardIcon size={18}/>
                            <span className='hidden md:inline'>Dashboard</span>
                        </Button>
                    </Link>

                    <Link href={"/transactions/create"} className=' flex items-center gap-2'>
                        <Button>
                            <PenBox size={20}/>
                            <span className='hidden md:inline'>Add Transactions</span>
                        </Button>
                    </Link>

                    <UserButton appearance={{
                        elements: {
                            avatarBox: { width: 35, height: 35}
                        }
                    }} />
                </SignedIn>

                <SignedOut>
                    <SignInButton forceRedirectUrl={"/dashboard"}>
                        <Button variant={"outline"}>Login</Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </nav>
    </div>
  )
}

export default Header