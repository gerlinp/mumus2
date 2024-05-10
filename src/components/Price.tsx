import React from 'react'

type Props = {
  price: number
  id: number
  options?: { title: string; additionalPrice: number }[]
}

const Price = ({ price, id, options }: Props) => {
  return (
    <div className='flexflex-col gap-4'>
      <h2>${price.toFixed(2)}</h2>
      {/* Options Container */}
      <div className='flex justify-between items-center'>
        {options?.map((option) => (
          <button
            key={option.title}
            className='p-2 ring-1 ring-red-400 rounded'
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* Quantitity Container */}
      <div className=''>
        <span>Quantity</span>
        <div>
          <button>{'<'}</button>
          <span>1</span>
          <button>{'>'}</button>
        </div>
      </div>
    </div>
  )
}

export default Price
