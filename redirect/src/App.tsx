import { useEffect } from 'react'
import './App.css'
import workoutLogo from './assets/images/workout-logo.svg'

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    window.location.replace(
      'exp://192.168.1.3:8081/--/auth?' + params.toString()
    )
  }, [])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-12'>
      <div className='flex flex-col items-center gap-10 animate-pulse'>
        <div className='flex flex-col items-center'>
          <img
            src={workoutLogo}
            className='size-20'
          />
          <span className='text-neutral-400 text-sm font-medium'>
            Workout, out loud.
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
