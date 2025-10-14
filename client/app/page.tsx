'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  function handleGetStarted() {
    router.push('/login')
  }

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Button
        onClick={handleGetStarted}
        className='bg-transparent border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-200 items-center justify-center'
      >
        <span>Get Started</span>
        <ArrowRight />
      </Button>
    </div>
  )
}
