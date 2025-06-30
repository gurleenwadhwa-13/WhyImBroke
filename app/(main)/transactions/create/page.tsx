"use client"

import { useSearchParams } from 'next/navigation';
import React from 'react'

export async function CreateTransactionPage(){
  const searchParams = useSearchParams();
  console.log(searchParams);

  return (
    <div>CreateTransactionPage</div>
  )
}

export default CreateTransactionPage;