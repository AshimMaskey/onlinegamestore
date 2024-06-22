import React, { useContext, useState } from 'react';
import { exportToPDF, exportToExcel } from '../pdf_excel/ExportUtils';
import AdminContext from '../Context/AdminContext';
import EditForm from './AdminProfileUpdate/EditForm';
import NewsForm from './AdminNews/NewsForm';
import Pagination from '../Pagination/Pagination';

const AdminNews = () => {
    const { newsData, handleDelete } = useContext(AdminContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);

    const indexOfLastNews = currentPage * itemsPerPage;
    const indexOfFirstNews = indexOfLastNews - itemsPerPage;
    const currentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(newsData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const columns = [
        { Header: 'ID', accessor: 'news_id' },
        { Header: 'Title', accessor: 'title' },
        { Header: 'Description', accessor: 'description' },
        { Header: 'Date', accessor: 'date' },
        { Header: 'Author', accessor: 'Author' },
    ];

    const handleExportToPdf = () => {
        const result = confirm('Export as PDF?');
        if (result) {
            exportToPDF(newsData, columns);
        }
    };

    const handleExportToExcel = () => {
        const result = confirm('Export as Excel?');
        if (result) {
            exportToExcel(newsData, columns);
        }
    };

    return (
        <>
            <div className='ml-10 mt-5'>
                <div>
                    <button
                        onClick={() => setShowModal(true)}
                        className='text-white mb-3 bg-indigo-600 py-1 hover:bg-indigo-800 duration-200 px-2 rounded-md'
                    >
                        Add News
                    </button>
                </div>
                <div className='mb-4'>
                    <button
                        onClick={handleExportToPdf}
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg mr-2'
                    >
                        Export to PDF
                    </button>
                    <button
                        onClick={handleExportToExcel}
                        className='bg-green-500 text-white px-4 py-2 rounded-lg'
                    >
                        Export to Excel
                    </button>
                </div>
                <div className='text-white overflow-x-auto mt-2'>
                    <h1 className='text-2xl mb-5'>News Data:</h1>
                    <table className='max-w-6xl divide-y divide-gray-700'>
                        <thead>
                            <tr>
                                <th className='px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider'>SN</th>
                                <th className='px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider'>News_ID</th>
                                <th className='px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider'>Title</th>
                                <th className='px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider'>Description</th>
                                <th className='px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider'>Date</th>
                                <th className='px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider'>Author</th>
                                <th className='px-2 py-3 bg-gray-800 text-left text-xs font-medium uppercase tracking-wider'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-gray-800 divide-y divide-gray-700'>
                            {currentNews.map((news, index) => (
                                <tr key={news.id} className='hover:bg-gray-700'>
                                    <td className='px-2 py-4 whitespace-nowrap'>{indexOfFirstNews + index + 1}</td>
                                    <td className='px-2 py-4 whitespace-nowrap'>{news.news_id}</td>
                                    <td className='px-2 py-4 whitespace-wrap'>{news.title}</td>
                                    <td className='px-2 py-4 whitespace-wrap'>
                                        <div className='truncate max-w-xs hover:whitespace-normal'>
                                            {news.description}
                                        </div>
                                    </td>
                                    <td className='px-2 py-4 whitespace-nowrap'>{news.date}</td>
                                    <td className='px-2 py-4 whitespace-nowrap'>{news.Author}</td>
                                    <td className='px-2 py-4 whitespace-nowrap'>
                                        <a target='_blank' href={news.link}>
                                            <button className='bg-blue-700 hover:bg-blue-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>View</button>
                                        </a>
                                        <button
                                            onClick={() => handleDelete(news.news_id)}
                                            className='bg-red-700 border-gray-800 border-2 rounded-lg text-white px-2 py-1 hover:cursor-pointer hover:bg-red-600 duration-200'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                </div>
            </div>
            <EditForm isVisible={showModal} onClose={setShowModal}>
                <NewsForm onClose={setShowModal} />
            </EditForm>
        </>
    );
};

export default AdminNews;
