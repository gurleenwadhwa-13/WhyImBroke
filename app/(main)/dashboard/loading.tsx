import React from 'react'
import { BarLoader } from 'react-spinners'

export default function loading() {
  return (
    <div>
        <BarLoader className='mt-4' width="100%" color='green'/>
    </div>
  )
}
