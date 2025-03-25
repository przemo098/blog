'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Blog</h1>
      <p className="text-xl text-gray-600">
        This is a Next.js blog application with Material-UI and Tailwind CSS.
      </p>
    </div>
  );
} 