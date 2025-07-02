import React from 'react'
import { statsData } from '@/data/landing-data'

const StatsData = () => {
  return (
    <>
    <section className='mx-auto py-20 bg-blue-50'>
        <div className='container mx-auto px-2'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                {statsData.map((data, index) => {
                    return (
                        <div className="flex flex-col mx-auto text-center" key={index}>
                            <div className='text-4xl font-bold text-blue-700 mb-3'>{data.value}</div>
                            <div className='text-xl font-medium text-gray-600 mb-auto'>{data.label}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
    </>
  )
}

export default StatsData