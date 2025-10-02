import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className='flex mx-auto justify-between'>
      <SignIn />
    </div>
  )
}

export default Page