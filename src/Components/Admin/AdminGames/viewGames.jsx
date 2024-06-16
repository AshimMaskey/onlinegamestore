import React, { useContext, useState } from 'react'
import AdminContext from '../../Context/AdminContext'
import { Link } from 'react-router-dom';

function ViewGames() {
	const {gamesData, handleDelete2} =useContext(AdminContext);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);
	const indexOfLastGame = currentPage * itemsPerPage;
	const indexOfFirstGame = indexOfLastGame - itemsPerPage;
	const currentGames = gamesData.slice(indexOfFirstGame, indexOfLastGame);
	const totalPages = Math.ceil(gamesData.length / itemsPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);		
  return (
	<>
	{/* <div className='mt-10'>
		<h1 className='text-white text-2xl'>Games Data:</h1>
		<div className="text-white pt-5">
			<table>
				<thead>
				<tr className='bg-purple-800'>
					<th className="border px-4 py-2">ID</th>
					<th className="border px-4 py-2">Title</th>
					<th className="border px-4 py-2">Price</th>
					<th className="border px-4 py-2">Genre</th>
					<th className="border px-4 py-2">Release Date</th>
					<th className="border px-4 py-2">Action</th>

				</tr>
				</thead>
				<tbody>
				{gamesData.map(game => (
					<tr key={game.game_id}>
					<td className="border px-4 py-2">{game.game_id}</td>
					<td className="border px-4 py-2">{game.game_title}</td>
					<td className="border px-4 py-2">{game.price}</td>
					<td className="border px-4 py-2">{game.genre}</td>
					<td className="border px-4 py-2">{game.release_date}</td>
					<td className="border px-4 py-2">
						<button className='bg-green-700 hover:cursor-pointer hover:bg-green-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>Edit</button>
						<button className='bg-blue-700 hover:cursor-pointer hover:bg-blue-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>View</button>
						<button onClick={()=>handleDelete2(game.game_id)} className='bg-red-700 border-gray-800 border-2 rounded-lg text-white px-2 py-1 hover:cursor-pointer hover:bg-red-600 duration-200 '>Delete</button>
					</td>
					</tr>
				))}
				</tbody>
			</table>
    	</div>
	</div> */}
	<div className="overflow-x-auto">      
	  <div className="inline-block">
		<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900">
		  <thead className="dark:bg-black">
			<tr>
			  <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
				ID
			  </th>
			  <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
				title
			  </th>
			  <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
				price
			  </th>
			  <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
				genre
			  </th>
			  <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
				release date
			  </th>
			  <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
				Action
			  </th>
			</tr>
		  </thead>
		  <tbody className=" dark:bg-gray-800">
			{currentGames.map((game, index) => (
			  <tr key={index} className={index % 2 === 0 ? 'bg-gray-950 dark:bg-gray-950' : 'bg-gray-900 dark:bg-gray-900'}>
				 <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
				  {game.game_id}
				</td>
				 <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
				  {game.game_title}
				</td>
			   
				<td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
				  {game.price}
				</td>
				<td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
				  {game.genre}
				</td>
				<td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
				 {game.release_date}
				</td>
				<td className="px-6 py-4 whitespace-no-wrap text-md md:text-md leading-5 text-white">
					<button className='bg-green-700 hover:cursor-pointer hover:bg-green-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>Edit</button>
					<Link to={`http://localhost:5173/Store/GameDetails/${game.game_id}`}><button className='bg-blue-700 hover:cursor-pointer hover:bg-blue-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>View</button></Link>
					<button onClick={()=>handleDelete2(game.game_id)} className='bg-red-700 border-gray-800 border-2 rounded-lg text-white px-2 py-1 hover:cursor-pointer hover:bg-red-600 duration-200 '>Delete</button>
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
	</>
  )
}

export default ViewGames