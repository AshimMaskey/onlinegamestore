import React, { useState } from 'react'
import { useEffect } from 'react';

function AdminHome() {
  const [adminData, setAdminData]=useState([]);
  const [userData, setUserData]=useState([]);
  useEffect(()=>{
    fetch('http://localhost/onlinegamestore/admin/showadmin.php',{
      method:'GET',
      headers: {
      'Content-Type':'application/json',
    },  
    })
    .then(response=>response.json())
    .then(data=>setAdminData(data))
    .catch(error=>console.error('error fetching data', error));
    
  },[]);
  
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

  const handleDelete = (userId) => {  

    fetch(`http://localhost/onlinegamestore/admin/deleteuser.php?id=${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          console.log(`User with ID ${userId} deleted successfully`);
          const updatedUserData = userData.filter(user => user.user_id !== userId);
          setUserData(updatedUserData);
        } else {
          console.error(`Failed to delete user with ID ${userId}`);
        }
      })
      .catch(error => console.error('error deleting user', error));
  };
  
  return (
	<>

  <div className='mt-10 mx-5 p-5 rounded-lg'>
    <div>
      <h1 className='text-white text-2xl'>List of Admins:</h1>
    </div>
    <div className='mt-5'>
    <table className=" border-collapse border text-white">
        <thead>
          <tr className='bg-purple-900'>
            <th className="border border-white px-2 py-2">ID</th>
            <th className="border border-white px-2 py-2">Admin Name</th>
            <th className="border border-white px-2 py-2">Email</th>
            <th className="border border-white px-2 py-2">Date of Birth</th>
            <th className="border border-white px-2 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {adminData.map(admin => (
            <tr key={admin.admin_id}>
              <td className="border border-white px-2 py-2">{admin.admin_id}</td>
              <td className="border border-white px-2 py-2">{admin.admin_name}</td>
              <td className="border border-white px-2 py-2">{admin.email}</td>
              <td className="border border-white px-2 py-2">{admin.date_of_birth}</td>
              <td className="border border-white px-2 py-2">{admin.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  <div className='mt-10 mx-5 p-5 rounded-lg'>
    <div>
      <h1 className='text-white text-2xl'>List of Users:</h1>
    </div>
    <div className='mt-5'>
    <table className=" border-collapse border text-white">
        <thead>
          <tr className='bg-purple-900'>
            <th className="border border-white px-2 py-2">ID</th>
            <th className="border border-white px-2 py-2">User Name</th>
            <th className="border border-white px-2 py-2">Email</th>
            <th className="border border-white px-2 py-2">Date of Birth</th>
            <th className="border border-white px-2 py-2">Phone</th>
            <th className="border border-white px-2 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(user => (
            <tr key={user.user_id}>
              <td className="border border-white px-2 py-2">{user.user_id}</td>
              <td className="border border-white px-2 py-2">{user.username}</td>
              <td className="border border-white px-2 py-2">{user.email}</td>
              <td className="border border-white px-2 py-2">{user.date_of_birth}</td>
              <td className="border border-white px-2 py-2">{user.phone}</td>
              <td className="border border-white px-2 py-2"><button className='bg-blue-700 hover:bg-blue-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>View</button><button onClick={()=>handleDelete(user.user_id)} className='bg-red-700   border-gray-800 border-2 rounded-lg text-white px-2 py-1 hover:cursor-pointer hover:bg-red-600 duration-200 '>Delete</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  </>
  )
}
export default AdminHome