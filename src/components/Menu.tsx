'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartIcon from './CartIcon'

const links = [
  { id: 1, title: 'Home', url: '' },
  { id: 2, title: 'Shop', url: '' },
  { id: 3, title: 'Locations', url: '' },
  { id: 4, title: 'Contact', url: '' },
]

const Menu = () => {
  const [open, setOpen] = useState(false)
  //   TEMPORARY
  const user = false

  return (
    <div>
      {!open ? (
        <Image
          src='/open.png'
          alt='open button'
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src='/close.png'
          alt='close button'
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div className='main-bg-color text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10 '>
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          {!user ? (
            <Link href='/login' onClick={() => setOpen(false)}>
              Login
            </Link>
          ) : (
            <Link href='/orders' onClick={() => setOpen(false)}>
              Orders
            </Link>
          )}
          <Link href='/cart' onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Menu
