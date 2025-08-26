"use client"

import { BarLoader } from "react-spinners"

export default function Loading() {
  return (
    <div className="container mx-auto px-5">
      <BarLoader className="mt-4" width="100%" color="green" />
    </div>
  )
}