import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../Context/AdminContext'
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [userData, setUserData]=useState([]);
  const {gamesData,paymentsData, payment_items}=useContext(AdminContext);
  console.log(paymentsData);
  let total=0;
  paymentsData.forEach(element => {
    total+=parseInt(element.amount);
  });
  console.log(total);

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

      <Link to='/Admin/PaymentDetails'>
      <div className='bg-blue-700 text-white font-semibold p-8 rounded-lg hover:cursor-pointer hover:bg-blue-800 duration-200'>
        <span className='text-5xl italic'>Rs. {total}</span>
        <p className='mt-3 text-2xl text-gray-300 font-serif'>Total Earning</p>
      </div>
      </Link>
     <Link to="/Admin/User">
     <div className='bg-[indianred] text-white font-semibold p-8 rounded-lg hover:cursor-pointer hover:bg-red-500 duration-200'>
        <span className='text-5xl italic'>{userData.length}</span>
        <p className='mt-3 text-2xl text-gray-300 font-serif'>Total Users</p>
      </div>
      </Link>
      <Link to="/Admin/Game">
      <div className='bg-purple-600 text-white font-semibold p-8 rounded-lg hover:cursor-pointer hover:bg-purple-700 duration-200'>
        <span className='text-5xl italic'>{gamesData.length}</span>
        <p className='mt-3 text-2xl text-gray-300 font-serif'>Total Games</p>
      </div>
      </Link>
     <Link to='/Admin/PaymentDetails'>
     <div className='bg-green-600 text-white font-semibold p-8 rounded-lg hover:cursor-pointer hover:bg-green-700 duration-200'>
        <span className='text-5xl italic'>{payment_items.length}</span>
        <p className='mt-3 text-2xl text-gray-300 font-serif'>Total Games Dowloaded</p>
      </div>
     </Link>
      
    </div>
  </div>
  </>
  )
}

export default AdminDashboard