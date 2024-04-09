import React, { useContext, useState } from 'react'
import GameForm from './GameForm';
import AdminContext from '../../Context/AdminContext';
import ViewGames from './viewGames';

function AdminGames() {
	const {gamesData} = useContext(AdminContext);
	const [show, setShow]= useState(false);
	const handleClick=()=>{
		setShow(!show);
	}
	console.log(show);
  return (
	<>
	<div className='m-10'>
		<div><button onClick={handleClick} className='text-white bg-indigo-600 py-1 hover:bg-indigo-800 duration-200 px-2 rounded-md'>Add Games</button></div>
		<div>
			{
				show?(<GameForm />): null
			}
		</div>
		<div>
			<ViewGames />
		</div>		
	</div>
	</>
  )
}

export default AdminGames