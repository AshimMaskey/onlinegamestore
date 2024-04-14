import React, { useContext, useState } from 'react';
import AdminContext from '../Context/AdminContext';

function News() {
  const { newsData } = useContext(AdminContext);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(newsData.length / newsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <>
    <div className='my-10 md:max-w-5xl flex mx-auto'>
      <h1 className='text-white text-3xl'>Esports News:</h1>
    </div>
      {currentNews.map((news) => (
        <a target='_blank' href={news.link}><div className="hover:bg-gray-200 hover:cursor-pointer duration-200 max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-5xl my-4 shadow-md">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full md:h-full md:w-72" src={`http://localhost/onlinegamestore/admin/${news.image_url}`} alt={news.title} />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{news.date}</div>
              <h2 className="mt-2 text-xl font-bold text-gray-800">{news.title}</h2>
              <p className="mt-2 text-gray-600">{news.description}</p>
              <div className="mt-4">
                <p className="text-gray-700">Author: {news.Author}</p>
              </div>
            </div>
          </div>
        </div>
        </a>
      ))}
      <div className='flex justify-center items-center my-14'>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className='bg-white rounded-md px-4 py-2 mr-4 focus:outline-none'
        >
          Previous
        </button>
        <div className='text-white'>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastNews >= newsData.length}
          className='bg-white rounded-md px-4 py-2 ml-4 focus:outline-none'
        >
          Next
        </button>
      </div>
    </>
  );
}

export default News;
