import React from 'react'
import Image from 'next/image'

const CartPage = () => {
  return (
    <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500'>
      {/* Products Container */}
      <div className='h-1/2 p-4 flex flex-col justify-center'>
        {/* Single item */}
        <div className='flex items-center justify-between mb-4 overflow-scroll'>
          <Image src='/temporary/p1.png' alt='' width={100} height={100} />
          <div className=''>
            <h1>sicilian</h1>
            <span>Large</span>
          </div>
          <h2>$79.99</h2>
          <span>X</span>
        </div>
      </div>
      {/* Payment Container */}
      <div className='h-1/2 p-4 bg-fuschia-50'>
        <div>
          <span>Subtotal (3 items)</span>
          <span>$81.70</span>
        </div>
        <hr className='' />
        <button className='bg-red-500 text-white p-3 rounded-md w-1/2'>
          CheckOut
        </button>
      </div>
    </div>
  )
}

export default CartPage
