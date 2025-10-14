'use client'

import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  function onClick() {
    window.location.href = getGoogleOAuthURL()
  }

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      <Button onClick={onClick}>
        <FcGoogle />
        <span className='font-medium text-neutral-100'>Login with Google</span>
      </Button>
    </div>
  )
}

function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const params = {
    client_id:
      '827281209561-a4qffegka0lj3lbkoip7nat43qp681e5.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:3000/login/redirect/google',
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  }
  const queryString = new URLSearchParams(params).toString()
  return `${rootUrl}?${queryString}`
}
