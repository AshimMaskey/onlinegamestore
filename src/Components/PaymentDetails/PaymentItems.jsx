import React, { useContext } from 'react'
import AdminContext from '../Context/AdminContext'

function PaymentItems() {
	const {payment_items}=useContext(AdminContext);
	const columns = [
		{ Header: 'ID', accessor: 'id' },
		{ Header: 'Payment_ID', accessor: 'payment_id' },
		{ Header: 'Game_ID', accessor: 'game_id' },		
	  ];
  return (
	<>
	<div className='ml-10'>
        <h1 className='text-white text-3xl my-3'>Item Downloaded:</h1>
    </div>
    <div className='ml-10 mb-4'>
        <button className='bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer text-white px-4 py-2 rounded-lg mr-2'>
          Export to PDF
        </button>
        <button className='bg-green-500 hover:bg-green-600 duration-200 cursor-pointer text-white px-4 py-2 rounded-lg'>
          Export to Excel
        </button>
	</div>
	<div className="overflow-x-auto ml-10">
	<div className="inline-block">
	<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900">
            <thead className="dark:bg-black">
              <tr>
                {columns.map(column => (
                  <th key={column.accessor} className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                    {column.Header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="dark:bg-gray-800">
              {payment_items.map((payment, index) => (
                <tr key={payment.id} className={index % 2 == 0 ? 'bg-gray-950 dark:bg-gray-950' : 'bg-gray-900 dark:bg-gray-900'}>
                  {columns.map(column => (
                    <td key={column.accessor} className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                      {payment[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
		  </div>
		  </div>
	</>
  )
}

export default PaymentItems