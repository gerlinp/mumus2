import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='h-12 md:h-24 p-4 lg:p-20 xl:p-40 text-white-500 items-center justify-between'>
      <Link href='/' className='font-bold text-xl'>
        Mumus Pikliz
      </Link>
      <p>All Rights Reserved</p>
    </div>
  )
}

export default Footer
