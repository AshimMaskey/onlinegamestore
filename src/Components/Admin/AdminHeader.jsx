import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AdminContext from '../Context/AdminContext';

function AdminHeader() {
  const {logout}=useContext(AdminContext);
  const handleLogout=()=>{
    const result=confirm("Are you sure you want to log out?");
    if(result){
      logout();
    }
  }
  return (
	<>
  <div className='flex sticky top-0 justify-between bg-[#18181C] px-5 py-5 items-center'>
    <div>
     <Link to='/Admin/Signup' > <button className='bg-green-600 hover:cursor-pointer hover:bg-green-700 duration-200 text-white py-1 px-2 rounded-md text-md'>Add Admin</button></Link>
     <Link to='/Signup' > <button className='bg-purple-600 hover:cursor-pointer hover:bg-purple-700 duration-200 text-white py-1 px-2 rounded-md text-md'>Add User</button></Link>
    </div>
    <div className='flex'>
      {/* <div className='flex items-center hover:cursor-pointer hover:border-b-2 border-white '><FontAwesomeIcon className='text-xl text-white' icon={faUserTie} /><p className='text-white text-lg ml-2'>User</p></div> */}

      <div onClick={handleLogout} className='flex items-center hover:cursor-pointer hover:border-b-2 border-white ml-8'><FontAwesomeIcon className='text-xl text-white ' icon={faArrowRightFromBracket} /><p className='text-white text-lg ml-2'>Log Out</p></div>
    </div>
  </div>
  </>
  )
}

export default AdminHeader