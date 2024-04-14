import React, { useContext, useState } from 'react'
import AdminContext from '../Context/AdminContext'
import { Link } from 'react-router-dom';

function PaidGames() {
	const {gamesData}= useContext(AdminContext);
	const PaidGames = gamesData.filter((game)=>game.price!=0);
	const [currentPage, setCurrentPage] = useState(1);
	const gamesPerPage = 6;

	const indexOfLastGame = currentPage * gamesPerPage;
	const indexOfFirstGame = indexOfLastGame - gamesPerPage;
	const currentGames = PaidGames.slice(indexOfFirstGame, indexOfLastGame);

	// Calculate total number of pages
	const totalPages = Math.ceil(PaidGames.length / gamesPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);




  return (
	<>
	<div className='flex mt-10 mx-auto flex-wrap justify-center max-w-5xl'>
        <h1 className='uppercase text-2xl text-white italic'>PAID GAMES:</h1>        
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
          disabled={indexOfLastGame >= PaidGames.length}
          className='bg-white rounded-md px-4 py-2 ml-4 focus:outline-none'
        >
          Next
        </button>
      </div>
	</>
  )
}

export default PaidGames