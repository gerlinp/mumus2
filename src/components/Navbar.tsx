import React from 'react'
import Menu from './Menu'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase'>
      {/* logo */}
      <div>
        <Link href='/'>Mumu's Pikliz</Link>
      </div>

      {/* mobile menu */}
      <div>
        <Menu />
      </div>
    </div>
  )
}

export default Navbar
