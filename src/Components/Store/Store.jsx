import React, { useContext } from 'react'
import AdminContext from '../Context/AdminContext'

function Store() {
  const {gamesData}= useContext(AdminContext);
  return (
	<>
<div className='flex mt-10 mx-auto justify-center max-w-5xl'>
  <h1 className='uppercase text-2xl text-white'>All Games :-</h1>
  <button className='bg-white rounded-md ml-4 px-2 hover:cursor-pointer hover:bg-gray-300 duration-200'>Sort</button>
</div>
<div className='justify-center mx-auto flex md:max-w-5xl flex-wrap gap-10 md:gap-20 my-10'>
{
  gamesData.map((game)=>
      <div className=" brightness-90 hover:cursor-pointer hover:shadow-white hover:shadow-md rounded-lg overflow-hidden">
      <img src={`http://localhost/onlinegamestore/admin/${game.image_url}`} className="w-64 md:w-72 h-52 rounded-xl object-cover" />
      <div className="p-4">
        <span className="text-gray-500 italic dark:text-gray-400 uppercase text-xs">{game.genre}</span>
        <h2 className="text-xl font-sans text-white font-semibold mt-2">{game.game_title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Rs. {game.price} </p>
      </div>
      </div>
   )
}
</div>
  </>
  )
}

export default Store