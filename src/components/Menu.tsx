'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const Menu = () => {
  const [open, setOpen] = useState(false)
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
    </div>
    {inks.map(item=>(

    ))}
  )
}

export default Menu
