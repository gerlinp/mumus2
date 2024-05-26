import React from 'react'
import Image from 'next/image'

const LoginPage = () => {
  return (
    <div>
      {/* box */}

      <div className=''>
        {/* Image Container */}
        <div className='relative'>
          <Image src='/loginBg.pngd' alt='fill' />
        </div>
        {/*Form Container */}
        <div className=''>
          <h1>Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <button className=''>
            <Image src='' alt='' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
