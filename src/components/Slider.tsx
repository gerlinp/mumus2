'use client'
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const data = [
  {
    id: 1,
    title: 'The essentials you need',
    image: '/slide1.png',
  },
  {
    id: 2,
    title: 'Need that pikliz',
    image: '/slide2.png',
  },
  {
    id: 3,
    title: 'Epis is the starting point to delicious',
    image: '/slide3.jpg',
  },
]

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : +1)),
      2000
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-green-900'>
      {/* TEXT CONTAINER */}
      <div className='h-1/2 flex items-center justify-center flex-col gap-8 text-white font-bold lg:h-full lg:w-1/2'>
        <h1 className='text-5xl text-center uppercase p-4 md:text-6xl xl:text-7xl'>
          {data[currentSlide].title}
        </h1>
        <button className='bg-white text-red-500 py-4 px-8'>Order Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className='w-full h-1/2 relative lg:h-full lg:w-1/2'>
        <Image
          src={data[currentSlide].image}
          alt='slide 1'
          fill
          className='object-cover'
        />
      </div>
    </div>
  )
}

export default Slider
