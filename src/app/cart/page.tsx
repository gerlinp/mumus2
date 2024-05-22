import React from 'react'
import Image from 'next/image'

const CartPage = () => {
  return (
    <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row'>
      {/* Products Container */}
      <div className='h-1/2 p-4 flex flex-col justify-center overflow-scroll kg:h-full lg:w-23'>
        {/* Single item */}
        <div className='flex items-center justify-between mb-4'>
          <Image src='/temporary/p1.png' alt='' width={100} height={100} />
          <div className=''>
            <h1 className='uppercase text-xl font-bold'>sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className='font-bold'>$79.99</h2>
          <span className='cursor-pointer'>X</span>
        </div>
        {/* Single item */}
        <div className='flex items-center justify-between mb-4'>
          <Image src='/temporary/p1.png' alt='' width={100} height={100} />
          <div className=''>
            <h1 className='uppercase text-xl font-bold'>sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className='font-bold'>$79.99</h2>
          <span className='cursor-pointer'>X</span>
        </div>
        {/* Single item */}
        <div className='flex items-center justify-between mb-4'>
          <Image src='/temporary/p1.png' alt='' width={100} height={100} />
          <div className=''>
            <h1 className='uppercase text-xl font-bold'>sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className='font-bold'>$79.99</h2>
          <span className='cursor-pointer'>X</span>
        </div>
        {/* Single item */}
        <div className='flex items-center justify-between mb-4'>
          <Image src='/temporary/p1.png' alt='' width={100} height={100} />
          <div className=''>
            <h1 className='uppercase text-xl font-bold'>sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className='font-bold'>$79.99</h2>
          <span className='cursor-pointer'>X</span>
        </div>
      </div>
      {/* Payment Container */}
      <div className='h-1/2 p-4 bg-fuschia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3'>
        <div className='flex justify-between'>
          <span>Subtotal (3 items)</span>
          <span>$81.70</span>
        </div>
        <div className='flex justify-between'>
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className='flex justify-between'>
          <span>Delivery Cost</span>
          <span className='text-green-500'>FREE!</span>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between'>
          <span>TOTAL(INCL. VAT)</span>
          <span className='font-bold'>$81.70</span>
        </div>
        <hr className='' />
        <button className='bg-red-500 text-white p-3 rounded-md w-1/2 self-end'>
          CheckOut
        </button>
      </div>
    </div>
  )
}

export default CartPage
