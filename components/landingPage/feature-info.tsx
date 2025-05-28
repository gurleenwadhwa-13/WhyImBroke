import React from 'react'
import { featuresData } from '@/data/landing-data'
import { Card, CardContent, CardTitle } from '../ui/card'

const FeatureInfo = () => {
  return (
    <section className='py-20'>
        <div className='container mx-auto px-4'>
            <h2 className='text-3xl text-center font-bold mb-12'>
                Everything you need to manage your Finances
            </h2>
            {featuresData.map((feature, index) => {
                return (
                    <Card>
                        {feature.icon}
                        <CardTitle>{feature.title}</CardTitle>
                        <CardContent>{feature.description}</CardContent>
                    </Card>
                )
            })}
        </div>
    </section>
    
  )
}

export default FeatureInfo