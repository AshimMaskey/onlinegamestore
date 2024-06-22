import React, { useContext, useState } from 'react';
import AdminContext from '../../Context/AdminContext';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from '@/Components/pdf_excel/ExportUtils';
import EditForm from '../AdminProfileUpdate/EditForm';
import GameUpdate from './GameUpdate';

function ViewGames() {
  const { gamesData, handleDelete2 } = useContext(AdminContext);
  const [showModal, setShowModal] = useState(false);
  const [currentGame, setCurrentGame] = useState(null); // State to hold current game being edited
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastGame = currentPage * itemsPerPage;
  const indexOfFirstGame = indexOfLastGame - itemsPerPage;
  const currentGames = gamesData.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(gamesData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { Header: 'ID', accessor: 'game_id' },
    { Header: 'Title', accessor: 'game_title' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Genre', accessor: 'genre' },
    { Header: 'Release Date', accessor: 'release_date' },
  ];

  const handleExportToPdf = () => {
    const result = window.confirm('Export as PDF?');
    if (result) {
      exportToPDF(gamesData, columns);
    }
  };

  const handleExportToExcel = () => {
    const result = window.confirm('Export as Excel?');
    if (result) {
      exportToExcel(gamesData, columns);
    }
  };

  const handleEditClick = (game) => {
    setCurrentGame(game);
    setShowModal(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="mb-4">
          <button onClick={handleExportToPdf} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
            Export to PDF
          </button>
          <button onClick={handleExportToExcel} className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Export to Excel
          </button>
        </div>
        <div className="inline-block">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900">
            <thead className="dark:bg-black">
              <tr>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Game_ID
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Release Date
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=" dark:bg-gray-800">
              {currentGames.map((game, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-950 dark:bg-gray-950' : 'bg-gray-900 dark:bg-gray-900'}
                >
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {indexOfFirstGame + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">{game.game_id}</td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">{game.game_title}</td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">{game.price}</td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">{game.genre}</td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">{game.release_date}</td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-md leading-5 text-white">
                    <button
                      onClick={() => handleEditClick(game)}
                      className="bg-green-700 hover:cursor-pointer hover:bg-green-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1"
                    >
                      Edit
                    </button>
                    <Link to={`http://localhost:5173/Store/GameDetails/${game.game_id}`}>
                      <button className="bg-blue-700 hover:cursor-pointer hover:bg-blue-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete2(game.game_id)}
                      className="bg-red-700 border-gray-800 border-2 rounded-lg text-white px-2 py-1 hover:cursor-pointer hover:bg-red-600 duration-200 "
                    >
                      Delete
                    </button>
                  </td>
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
      </div>
      <EditForm isVisible={showModal} onClose={setShowModal}>
        <GameUpdate game={currentGame} onClose={setShowModal} />
      </EditForm>
    </>
  );
}

export default ViewGames;
