import AdminContext from '@/Components/Context/AdminContext';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { showToast } from '@/Components/toast/toast';
import Confirm from '@/Components/Confirm/Confirm';

function Section1() {
  const { gamesData } = useContext(AdminContext);
  const [isOpen, setIsOpen]=useState(false);
  const [selectedGames, setSelectedGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const storedSelectedGames = localStorage.getItem('selectedGames');
    if (storedSelectedGames) {
      setSelectedGames(JSON.parse(storedSelectedGames));
    }
  }, []);

  const handleGameSelect = (game_id) => {
    if (selectedGames.includes(game_id)) {
      setSelectedGames(selectedGames.filter((id) => id !== game_id));
    } else {
      if (selectedGames.length < 5) {
        setSelectedGames([...selectedGames, game_id]);
      } else {
        showToast({message:'You can only select 5 games', condition:'error'});
      }
    }
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleConfirm=()=>{
    localStorage.setItem('selectedGames', JSON.stringify(selectedGames));
    setIsOpen(false);
    showToast({message:'Changes saved successfullly!', condition:'success'});

  }
  const handleCancel=()=>{
    setIsOpen(false);
  }

  const indexOfLastGame = currentPage * itemsPerPage;
  const indexOfFirstGame = indexOfLastGame - itemsPerPage;
  const currentGames = gamesData.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(gamesData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <div className='my-3 ml-10'>
      <h1 className='text-white text-center text-3xl'>Select Games:</h1>
    </div>
      <div className="overflow-x-auto flex justify-center ml-10">
        <div className=" text-center inline-block">
          <table className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900">
            <thead className="dark:bg-black">
              <tr>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Game_ID
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Game
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Select
                </th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-800">
              {currentGames.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-950 dark:bg-gray-950' : 'bg-gray-900 dark:bg-gray-900'}>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {indexOfFirstGame + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {item.game_id}
                  </td>
                  <td className="px-6 items-center flex flex-wrap py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    <img className="w-36 mr-2 rounded-md" src={`http://localhost/onlinegamestore/admin/${item.image_url}`} alt="" />
                    <div>{item.game_title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {item.genre}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    Rs.{item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-md leading-5 text-white">
                    <input
                      className="h-5 w-5 hover:cursor-pointer"
                      type="checkbox"
                      checked={selectedGames.includes(item.game_id)}
                      onChange={() => handleGameSelect(item.game_id)}
                    />
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
          <div className="w-full text-center mt-5">
            <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-800 duration-200 text-white rounded-md px-2 py-1">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <Confirm message="Do you want to save the changes?" isOpen={isOpen} onCancel={handleCancel} onConfirm={handleConfirm}/>
    </>
  );
}

export default Section1;
