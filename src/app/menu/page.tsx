import React from 'react'
import Link from 'next/link'
import { menu } from '@/data'

const Menu = () => {
  return
  ;<>
    <div className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center'>
      {menu.map((category) => (
        <Link
          href={'/menu/$category.slug'}
          key={category.id}
          className='w-full h1/3 bg-cover p-8'
          style={{ backgroundImage: 'url($category.img)' }}
        >
          <div className={'text-${category.color} w-1/2'}>
            <h1 className='uppercase font-bold text-3xl'>{category.title}</h1>
            <p className='text-sm my-8'>{category.desc}</p>
            <button className={'hidden 2xl:block'}>Explore</button>
          </div>
        </Link>
      ))}
    </div>
  </>
}

export default Menu
