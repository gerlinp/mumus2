import React from 'react'
import Link from 'next/link'
import { menu } from '@/data'

const Menu = () => {
  return
  ;<div className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center'>
    {menu.map((category) => (
      <Link
        href={category.slug}
        key={category.id}
        className='w-full h1/3 bg-cover'
        style={{ backgroundImage: 'url($category.img)' }}
      >
        <h1>{category.title}</h1>
        <p>{category.desc}</p>
        <button className=''>Explore</button>
      </Link>
    ))}
  </div>
}

export default Menu
