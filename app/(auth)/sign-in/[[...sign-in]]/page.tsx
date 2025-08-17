import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className='container mx-auto px-40'>
      <SignIn />
    </div>
  )
}

export default Page