import React, { useContext, useState } from 'react'
import GameForm from './GameForm';
import AdminContext from '../../Context/AdminContext';
import ViewGames from './viewGames';
import EditForm from '../AdminProfileUpdate/EditForm';

function AdminGames() {
	const {gamesData} = useContext(AdminContext);
	const [showModal, setShowModal]=useState(false);
	const [show, setShow]= useState(false);
	const handleClick=()=>{
		setShow(!show);
	}
	console.log(show);
  return (
	<>
	<div className=''>
		<div><button onClick={()=>setShowModal(true)} className='text-white mb-3 bg-indigo-600 py-1 hover:bg-indigo-800 duration-200 px-2 rounded-md'>Add Games</button></div>
		<div>
			<ViewGames />
		</div>		
	</div>
	<EditForm isVisible={showModal} onClose={setShowModal}>
		<GameForm onclose={setShowModal}/>
	</EditForm>

	</>
  )
}

export default AdminGames