import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../Context/AdminContext'

function AdminDashboard() {
  const [userData, setUserData]=useState([]);
  const {gamesData}=useContext(AdminContext);
  useEffect(()=>{
    fetch('http://localhost/onlinegamestore/admin/showuser.php',{
      method:'GET',
      headers: {
      'Content-Type':'application/json',
    },
    })
    .then(response=>response.json())
    .then(data=>setUserData(data))
    .catch(error=>console.error('error fetching data', error));
    
  },[]);
  return (
	<>
  <div className='m-10'>
    <h1 className='text-white text-3xl font-serif'>Dashboard</h1>
  </div>
  <div className='m-10'>
    <div className='flex w-full flex-wrap gap-10'>

      <div className='bg-blue-700 text-white font-semibold p-8 rounded-lg hover:cursor-pointer hover:bg-blue-800 duration-200'>
        <span className='text-5xl italic'>Rs. 3000</span>
        <p className='mt-3 text-2xl text-gray-300 font-serif'>Total Earning</p>
      </div>
      <div className='bg-[indianred] text-white font-semibold p-8 rounded-lg hover:cursor-pointer hover:bg-red-500 duration-200'>
        <span className='text-5xl italic'>{userData.length}</span>
        <p className='mt-3 text-2xl text-gray-300 font-serif'>Total Users</p>
      </div>
      <div className='bg-purple-600 text-white font-semibold p-8 rounded-lg hover:cursor-pointer hover:bg-purple-700 duration-200'>
        <span className='text-5xl italic'>{gamesData.length}</span>
        <p className='mt-3 text-2xl text-gray-300 font-serif'>Total Games</p>
      </div>
      <div className='bg-green-600 text-white font-semibold p-8 rounded-lg hover:cursor-pointer hover:bg-green-700 duration-200'>
        <span className='text-5xl italic'>20+</span>
        <p className='mt-3 text-2xl text-gray-300 font-serif'>Total Games Dowloaded</p>
      </div>
      
    </div>
  </div>
  </>
  )
}

export default AdminDashboard