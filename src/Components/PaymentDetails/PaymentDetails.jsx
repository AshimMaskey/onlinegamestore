import React, { useContext, useState } from 'react';
import AdminContext from '../Context/AdminContext';
import { exportToExcel, exportToPDF } from '@/Components/pdf_excel/ExportUtils';
import Pagination from '../Pagination/Pagination';
import PaymentItems from './PaymentItems';

function PaymentDetails() {
  const { paymentsData } = useContext(AdminContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayment = paymentsData.slice(indexOfFirstPayment, indexOfLastPayment);  
  const totalPages = Math.ceil(paymentsData.length / itemsPerPage);  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Transaction Code', accessor: 'transaction_code' },
    { Header: 'Product code', accessor: 'product_code' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'User Id', accessor: 'user_id' },
    { Header: 'Amount', accessor: 'amount' },
    { Header: 'Created at', accessor: 'created_at' },
  ];

  const handleExportToPdf = () => {
    const result = confirm('Export as PDF?');
    if (result) {
      exportToPDF(paymentsData, columns);
    }
  };

  const handleExportToExcel = () => {
    const result = confirm('Export as Excel?');
    if (result) {
      exportToExcel(paymentsData, columns);
    }
  };

  return (
    <>
      <div className='ml-10'>
        <h1 className='text-white text-3xl my-3'>Payment Details</h1>
      </div>
      <div className='ml-10 mb-4'>
        <button onClick={handleExportToPdf} className='bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer text-white px-4 py-2 rounded-lg mr-2'>
          Export to PDF
        </button>
        <button onClick={handleExportToExcel} className='bg-green-500 hover:bg-green-600 duration-200 cursor-pointer text-white px-4 py-2 rounded-lg'>
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
              {currentPayment.map((payment, index) => (
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
          <div className="pagination flex justify-center items-center mt-5">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-700 text-white px-3 py-1 rounded-l"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-white px-3 py-1 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
        {/* <PaymentItems/> */}
      </div>

    </>
  );
}

export default PaymentDetails;
