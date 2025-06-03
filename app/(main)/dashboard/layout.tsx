import React, { Suspense } from 'react'
import DashboardPage from './page'
import { BarLoader } from 'react-spinners'

const DashboardLayout = () => {
  return (
    <div className='container mx-auto text-5xl gradient-title font-bold px-5'>
       <h1> Dashboard</h1>
       <Suspense 
        fallback={<BarLoader className='mt-4' width="100%" color='blue'/>}
        >
        <DashboardPage />
       </Suspense>
       
    </div>
  )
}

export default DashboardLayout