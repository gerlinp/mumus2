import React from 'react'
import Image from 'next/image'

const LoginPage = () => {
  return (
    <div className='p-4 h-[calc(100vh)] md-h-[calc(100vh-9rem)] flex items-center justify-center'>
      {/* box */}
      <div className='h-full shadow-2xl rounded-md flex flex-col md:flex-row'>
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
          <button
            className='flex gap-4 p-4 ring-1 ring-blue-100 
          rounded-md'
          >
            <Image src='/facebook.png' alt='' width={20} height={20} />
            <span>Sign in with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
