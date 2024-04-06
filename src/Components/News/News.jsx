import React, { useContext } from 'react';
import AdminContext from '../Context/AdminContext';

function News() {
  const { newsData } = useContext(AdminContext);
  
  return (
    <>
      {newsData.map((news) => (
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
    </>
  );
}

export default News;
