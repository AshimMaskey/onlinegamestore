import React, { useContext } from 'react'
import AdminContext from '../../Context/AdminContext'

function ViewGames() {
	const {gamesData, handleDelete2} =useContext(AdminContext);
	console.log(gamesData);
  return (
	<>
	<div className='mt-10'>
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
	</div>
	</>
  )
}

export default ViewGames