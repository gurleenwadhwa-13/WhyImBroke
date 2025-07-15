import React, { PropsWithChildren, Suspense } from 'react'
import DashboardPage from './page'
import { BarLoader } from 'react-spinners'

const DashboardLayout = ({children}: PropsWithChildren) => {
  return (
    <div className='container mx-auto px-5'>
       <h1 className='text-5xl font-bold gradient-title ml-9'> Dashboard</h1>
       <Suspense fallback={<BarLoader className='mt-4' width="100%" color='green'/>} >
       {children}
       </Suspense>
    </div>
  )
}

export default DashboardLayout