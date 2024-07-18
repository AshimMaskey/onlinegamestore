import React, { useContext, useState } from 'react'
import AdminContext from '../Context/AdminContext'
import { useParams } from 'react-router-dom';
import Confirm from '../Confirm/Confirm';
import Loading from '../Loading/Loading';

function GameDetails() {
	const {gameid}= useParams();
	const {gamesData, handleAddToCart}=useContext(AdminContext);
	const [isOpenConfirm, setIsOpenConfirm]=useState(false);
	const [gameId, setGameId]=useState(null);
	const handleAdd=(game_id)=>{
		setIsOpenConfirm(true);
		setGameId(game_id)
	}
	const handleConfirm=()=>{
		handleAddToCart(gameId);
		setIsOpenConfirm(false);
	}
	const handleCancel=()=>{
		setIsOpenConfirm(false);
	}
	const game= gamesData && gamesData.find(game=>game.game_id===gameid)
	console.log(game);
	if (!game) {
		return (
		  <Loading />
		);
	  }

  return (	
	<>
	<div className='mt-10 mb-20 mx-7 md:mx-20 md:max-w-7xl'>
		<div>
			<h1 className='text-white italic text-2xl md:text-4xl font-sans font-semibold'>{game.game_title}</h1>
		</div>
		<div className='mt-10'>
			<h1 className='text-white text-xl tracking-widest border-white border-b-2 inline-block'>OVERVIEW</h1>
			<div className='mt-5'>
				<span className='text-gray-300 italic font-light'>Release Date: {game.release_date}</span>
			</div>
			<img src={`http://localhost/onlinegamestore/admin/${game.image_url}`} className='rounded-lg mt-5 w-5/6 md:w-4/5' alt="" />
			<div className='w-full md:w-4/5 mt-5'>
				<p className='text-gray-100 text-md md:text-lg'>{game.description}</p>
			</div>
			<div className='mt-5 border-white border-x-2 px-3 inline-block'>
				<span className='text-gray-300'>Genre:</span>
				<span className='text-white italic'> {game.genre}</span>
			</div>
			<br />
			<div className='mt-5 border-white border-x-2 px-3 inline-block'>
				<span className='text-gray-300'>Price:</span>
				<span className='text-white italic'> {game.price}</span>
			</div>
			<div className='mt-10'>
				<button onClick={()=>handleAdd(game.game_id)} className='cursor-pointer bg-white text-black py-1 px-2 rounded-sm hover:bg-gray-200 duration-200'>Add to Cart</button>
			</div>
		</div>
	</div>
	<Confirm message="Add the game to cart?" onCancel={handleCancel} onConfirm={handleConfirm} isOpen={isOpenConfirm}/>
	</>
  )
}

export default GameDetails