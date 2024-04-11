import React from 'react'
import Menu from './Menu'
import Link from 'next/link'
import Image from 'next/image'
import CartIcon from './CartIcon'

const user = false
const Navbar = () => {
  return (
    <div className='h-12 text-black-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase'>
      {/* logo */}
      <div>
        <Link href='/'>Mumu's Pikliz</Link>
      </div>

      <div className='hidden md:flex gap-4'>
        <Link href='/'>Homepage</Link>
        <Link href='/'>Shop</Link>
        <Link href='/'>Locations</Link>
        <Link href='/'>Contact</Link>
      </div>

      {/* mobile menu */}
      <div className='flex md:hidden'>
        <Menu />
      </div>
      {/* Right Links */}
      <div className='hidden md:flex gap-4' items-center>
        <div className='flex items-center gap-2 cursor-pointer bg-orange-300 px-1' rounded-md/>
          <Image src='phone.png' alt='phone' width={20} height={20} />
        </div>
        {!user ? (
          <Link href='/login'>Login</Link>
        ) : (
          <Link href='/orders'>Orders</Link>
        )}{' '}
        <CartIcon/>
      </div>
    </div>
  )
}

export default Navbar
