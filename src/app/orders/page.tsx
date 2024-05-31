import React from 'react'

const OrdersPage = () => {
  return (
    <div className='p-4 lg:px-20xl:px-40'>
      <table className='w-full border-separate'>
        <thead>
          <tr className='text-left'>
            <th className='hidden md:block'>Order Id</th>
            <th>Date</th>
            <th>Price</th>
            <th className='hidden md:block'>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-sm md:text-base odd:bg-red-100'>
            <td className='hidden md:block py-6 px-1'>123456787121</td>
            <td className='py-6 px-1'>05.31.2024</td>
            <td className='py-6 px-1'>89.90</td>
            <td className='hidden md:block'>
              Big Burder Menu(2), Veggie Pizza(2), Coca Cola 1L (2)
            </td>
            <td className='py-6 px-1'>On the way (approx. 10min)...</td>
          </tr>
          <tr className='text-sm md:text-base odd:bg-gray-100'>
            <td className='hidden md:block py-6 px-1'>123456787121</td>
            <td className='py-6 px-1'>05.31.2024</td>
            <td className='py-6 px-1'>89.90</td>
            <td className='hidden md:block'>
              Big Burder Menu(2), Veggie Pizza(2), Coca Cola 1L (2)
            </td>
            <td className='py-6 px-1'>On the way (approx. 10min)...</td>
          </tr>
          <tr className='text-sm md:text-base odd:bg-gray-100'>
            <td className='hidden md:block py-6 px-1'>123456787121</td>
            <td className='py-6 px-1'>05.31.2024</td>
            <td className='py-6 px-1'>89.90</td>
            <td className='hidden md:block'>
              Big Burder Menu(2), Veggie Pizza(2), Coca Cola 1L (2)
            </td>
            <td className='py-6 px-1'>On the way (approx. 10min)...</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage
