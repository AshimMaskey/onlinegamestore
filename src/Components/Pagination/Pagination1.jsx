import React from 'react'

function Pagination1({currentPage, totalPages, paginate}) {
  return (
	<>
	<div className="pagination mt-5">
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
	</>
  )
}

export default Pagination1;