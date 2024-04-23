import React from 'react'
import Image from 'next/image'

const data = [
  {
    id: 1,
    title: 'The essentials you need',
    image: '/slide1.png',
  },
  {
    id: 2,
    title: 'The essentials you need',
    image: '/slide1.png',
  },
  {
    id: 3,
    title: 'The essentials you need',
    image: '/slide1.png',
  },
]

const Slider = () => {
  return (
    <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]'>
      {/* TEXT CONTAINER */}
      <div className='h-1/2 flex items-center justify-center flex-col gap-8 text-white font-bold'>
        <h1 className='text-5xl text-center uppercase p-4 md:text-6xl xl:text-7xl'>
          Test
        </h1>
        <button className='bg-white text-red-500 py-4 px-8'>Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className='w-full h-1/2 relative'>
        <Image src='/slide1.png' alt='slide 1' fill className='object-cover' />
      </div>
    </div>
  )
}

export default Slider
