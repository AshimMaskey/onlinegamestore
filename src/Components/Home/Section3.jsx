import React, { useContext } from 'react'
import Button from "../Buttons/Button";
import Button3 from "../Buttons/Button3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import AdminContext from '../Context/AdminContext';
import { Link } from 'react-router-dom';

function Section3() {
	const {gamesData}= useContext(AdminContext);
	const freeGames= gamesData.filter((game)=>game.price==0);
	const totalGamesToShow=3;
	const freeGames1=freeGames.slice(0, totalGamesToShow);
	console.log(freeGames1);
  return (
	<>
	<div className='w-[80%] mx-auto bg-[#2A2A2A] mb-32'>
		<div className='flex flex-col p-10'>
			<div className='flex justify-between'>
				<div className='flex text-2xl text-white'>
					<div>
						<FontAwesomeIcon icon={faGift} />
					</div>
					<div className='pl-3'>
						<h3>Free Games</h3>
					</div>					
				</div>
				<div>
					<Link to={'/FreeGames'}>
					<Button value="View More" />
					</Link>
				</div>
			</div>
			<div className='mt-10 flex-wrap flex justify-around'>
				{
					freeGames1.map((game)=>(
						<Link to={`/Store/GameDetails/${game.game_id}`} key={game.game_id}>
						<div className='hover:cursor-pointer hover:brightness-75 duration-200'>
						<div >
							<img className='rounded-lg w-80 h-52' src={`http://localhost/onlinegamestore/admin/${game.image_url}`}/>
						</div>
						<div className=''>
							<Button3 value="View More" />
						</div>
						<div className='flex flex-col mt-4'>
							<span className="text-white text-lg font-serif">{game.game_title}</span>
							<span className="text-[#A4A4A4] text-lg font-serif">Free Now: {game.release_date}</span>
						</div>
					</div>
					</Link>
					))
				}
			</div>
		</div>

	</div>
	</>
  )
}

export default Section3