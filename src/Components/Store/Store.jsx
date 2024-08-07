import React, { useContext, useEffect, useState } from 'react';
import AdminContext from '../Context/AdminContext';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

function Store() {
  
  const { gamesData } = useContext(AdminContext);
  const [loading, setLoading]=useState(true);
  useEffect(()=>{
setLoading(false);

  }),[gamesData];
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1);
  };

  const filteredGames = selectedGenre
    ? gamesData.filter((game) => game.genre === selectedGenre)
    : gamesData;

  // Calculate index range for current page
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if(loading){
    return(
      <Loading/>
    )
  }
  return (
    <>
      <div className='flex mt-10 mx-auto flex-wrap justify-between max-w-5xl'>
        <h1 className='uppercase text-2xl text-white italic'>ALL GAMES:</h1>
        <div>
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className='bg-white rounded-md px-2 py-1 mr-4 focus:outline-none'
          >
            <option value=''>All Genres</option>
            {Array.from(new Set(gamesData.map((game) => game.genre))).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='justify-center mx-auto flex md:max-w-5xl flex-wrap gap-10 md:gap-20 my-10'>
        {currentGames.map((game) => (
          <Link to={`/Store/GameDetails/${game.game_id}`} key={game.game_id}>
            <div className='brightness-90 hover:cursor-pointer hover:shadow-white hover:shadow-md rounded-lg overflow-hidden'>
              <img
                src={`http://localhost/onlinegamestore/admin/${game.image_url}`}
                className='w-64 md:w-72 h-52 rounded-xl object-cover'
              />
              <div className='p-4'>
                <span className='text-gray-500 italic dark:text-gray-400 uppercase text-xs'>{game.genre}</span>
                <h2 className='text-xl font-sans text-white font-semibold mt-2'>{game.game_title}</h2>
                <p className='text-gray-600 dark:text-gray-300 mt-2'>Rs. {game.price} </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='flex justify-center items-center mb-14'>
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
          disabled={indexOfLastGame >= filteredGames.length}
          className='bg-white rounded-md px-4 py-2 ml-4 focus:outline-none'
        >
          Next
        </button>
      </div>

    </>
  );
}

export default Store;
