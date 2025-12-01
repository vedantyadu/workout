import {
  ArrowUpRight,
  CalendarHeart,
  ChartNoAxesColumn,
  Clock,
  Scale,
  Utensils,
} from 'lucide-react'
import { PiFire } from 'react-icons/pi'
import { RiFootprintLine } from 'react-icons/ri'
import { FaPersonArrowUpFromLine } from 'react-icons/fa6'

export default function ProfilePage() {
  return (
    <div className='flex flex-col'>
      <div className='flex border-b px-6 py-8 gap-8 border-neutral-200'>
        <div className='size-32 rounded-full bg-neutral-200' />
        <div className='flex flex-col gap-4 flex-1'>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-col'>
              <div className='font-medium text-lg'>John Doe</div>
              <div className='text-neutral-500'>@johndoe</div>
            </div>
            <div className='text-sm text-neutral-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex items-center text-sm  gap-1 border border-neutral-200 px-2 rounded-md py-1'>
                <div className='flex items-center gap-1 text-neutral-500'>
                  <CalendarHeart className='size-4' />
                  <span>Age</span>
                </div>
                <span>26 years</span>
              </div>
              <div className='flex items-center text-sm  gap-1 border border-neutral-200 px-2 rounded-md py-1'>
                <div className='flex items-center gap-1 text-neutral-500'>
                  <FaPersonArrowUpFromLine className='size-4' />
                  <span>Height</span>
                </div>
                <span>183 cm</span>
              </div>
              <div className='flex items-center text-sm  gap-1 border border-neutral-200 px-2 rounded-md py-1'>
                <div className='flex items-center gap-1 text-neutral-500'>
                  <Scale className='size-4' />
                  <span>Weight</span>
                </div>
                <span>75 kg</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex items-center gap-2 text-neutral-600'>
              <ChartNoAxesColumn className='size-4' />
              <span className='font-medium'>Yesterday&apos;s Stats</span>
            </div>
            <div className='flex gap-2'>
              <div className='flex flex-col p-2 rounded-md border border-neutral-200'>
                <div className='flex items-center text-green-500 gap-1'>
                  <RiFootprintLine />
                  <span className='text-sm'>Steps</span>
                </div>
                <span className='font-medium'>12849</span>
              </div>
              <div className='flex flex-col p-2 rounded-md border border-neutral-200'>
                <div className='flex items-center text-orange-500 gap-1'>
                  <PiFire />
                  <span className='text-sm'>Calories Burnt</span>
                </div>
                <span className='font-medium'>1225</span>
              </div>
              <div className='flex flex-col p-2 rounded-md border border-neutral-200'>
                <div className='flex items-center text-red-500 gap-1'>
                  <Utensils className='size-4' />
                  <span className='text-sm'>Calories Consumed</span>
                </div>
                <span className='font-medium'>2300</span>
              </div>
              <div className='flex flex-col p-2 rounded-md border border-neutral-200'>
                <div className='flex items-center text-blue-500 gap-1'>
                  <Clock className='size-4' />
                  <span className='text-sm'>Workout Duration</span>
                </div>
                <span className='font-medium'>2 hours</span>
              </div>
            </div>
            <button className='flex items-center text-sky-500 gap-1 cursor-pointer'>
              <span className='text-sm'>View All Stats</span>
              <ArrowUpRight className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
