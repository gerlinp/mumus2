import React from 'react'
import Image from 'next/image'

const LoginPage = () => {
  return (
    <div>
      {/* box */}

      <div className=''>
        {/* Image Container */}
        <div className='relative'>
          <Image src='/loginBg.png' alt='fill' />
        </div>
        {/*Form Container */}
        <div className=''>
          <h1>Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <button className='flex gap-4 p-f ring-1 ring-orange-100 rounded-md'>
            <Image
              src='/google.png'
              alt=''
              width={20}
              height={20}
              className='object-contain'
            />
            <span>Sign in with Google</span>
          </button>
          <button className='flex gap-4 p-4 ring-1 ring-orange-100 rounded-md'></button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
