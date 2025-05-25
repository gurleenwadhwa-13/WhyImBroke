import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className='container mx-50 my-50 px-40'>
      <SignIn />
    </div>
  )
}

export default Page