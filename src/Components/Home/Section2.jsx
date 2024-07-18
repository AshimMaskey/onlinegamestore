import React, { useState, useEffect, useContext } from 'react';
import Button from "../Buttons/Button";
import AdminContext from "../Context/AdminContext";
import { Link } from 'react-router-dom';
import Confirm from '../Confirm/Confirm';

const Section2=()=>{
	const {gamesData, handleAddToCart}= useContext(AdminContext);
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
	const noOfGames=4;
	const paidGames=gamesData.filter((game)=>game.price!=0);
	const paidGames1=paidGames.slice(0,noOfGames);
	// console.log(paidGames1);
return(
	<>
	<div className="w-[80%] mx-auto mt-20 mb-40	">		
		<div className="flex flex-col ">		
		<div className="mb-10 mx-10 md:mx-2 flex justify-between items-center">
			<h1 className="text-white text-xl md:text-3xl text-center">Paid Games:</h1>
			<Link to={'/PaidGames'}><Button value='View More'/></Link>
		</div>
		<div className='flex flex-wrap justify-around gap-x-2 gap-y-10'>
			{
				paidGames1.map((game)=>(
					<div key={game.game_id} className="flex hover:cursor-pointer gap-y-2 flex-col w-64 max-h-[28rem]">
						<Link to={`/Store/GameDetails/${game.game_id}`}>
						<div className="">
								<img className="rounded-2xl hover:brightness-75 duration-300" src={`http://localhost/onlinegamestore/admin/${game.image_url}`} alt="" />
							</div>
						</Link>
							<div>
								<span className="text-white text-lg font-semibold">{game.game_title}</span>
							</div>
							<div className=" flex justify-between items-center">
								<span className="text-white text-lg font-thin italic">Rs. {game.price}</span>
								<button onClick={()=>handleAdd(game.game_id)} className='text-black rounded-sm hover:bg-gray-300 duration-300 bg-white py-1 px-2'>Add to cart</button>
							</div>			
					</div>
				))
			}	
			</div>		
		</div>
	</div>
	<Confirm message="Add the game to cart?" onCancel={handleCancel} onConfirm={handleConfirm} isOpen={isOpenConfirm}/>
	</>
)
}
export default Section2;