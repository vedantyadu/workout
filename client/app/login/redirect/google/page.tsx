'use client'

import { backend } from '@/utils/axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function GoogleRedirect() {
  const router = useRouter()

  async function handleRedirect() {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (code) {
      await backend.post('/oauth/google', { code })
    }
    router.push('/')
  }

  useEffect(() => {
    handleRedirect()
  }, [])

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex flex-col gap-6 items-center'>
        <FcGoogle size={48} />
        <span className='animate-pulse'>Logging in using Google</span>
      </div>
    </div>
  )
}
