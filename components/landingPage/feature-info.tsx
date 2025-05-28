import React from 'react'
import { featuresData } from '@/data/landing-data'
import { howItWorksData } from '@/data/landing-data'
import { Card, CardContent, CardTitle } from '../ui/card'

const FeatureInfo = () => {
  return (
    <>
    <section className='py-20'>
        <div className='container mx-auto px-4'>
            <h2 className='text-3xl text-center font-bold mb-12'>
                Everything you need to manage your Finances
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-8'>
                {featuresData.map((feature, index) => {
                    return (
                    <Card key={index} className='p-6'>
                        <CardContent className='space-y-4 pt-4'>
                            {feature.icon}
                            <h3 className='font-semibold text-xl'>{feature.title}</h3>
                            <p className='text-gray-600'>{feature.description}</p>
                        </CardContent>
                    </Card>
                    )
                })}
            </div>
        </div>
    </section>

    <section className='py-20 bg-blue-50'>
        <div className='container mx-auto px-4'>
            <h2 className='text-3xl text-center font-bold mb-16'>
                How it Works
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {howItWorksData.map((step, index) => {
                    return (
                        <div key={index} className='text-center'>
                            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>{step.icon}</div>
                            <h3 className='font-semibold text-xl mb-4'>{step.title}</h3>
                            <p className='text-gray-600'>{step.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
    </>
  )
}

export default FeatureInfo