import React, { useState } from 'react'
import { useEffect } from 'react';

function AdminHome() {
  const [adminData, setAdminData]=useState([]);
  const [userData, setUserData]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
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
    const result=confirm('are you sure you want to delete this user?');
    if(result){
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
            alert('user deleted successfully');
          } else {
            console.error(`Failed to delete user with ID ${userId}`);
          }
        })
        .catch(error => console.error('error deleting user', error));
    }
  };

  const disable_enable = (id, status) => {
    const action = status == 1 ? 'Disable' : 'Enable';
    const result = window.confirm(`${action} User?`);
    if (result) {
      fetch('http://localhost/onlinegamestore/admin/update_user_status.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: id, status: status == 1 ? 0 : 1 }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == 'success') {
            setUserData(userData.map(user => (user.user_id == id ? { ...user, status: status == 1 ? 0 : 1 } : user)));
          } else {
            console.error('Failed to update user status');
          }
        })
        .catch(error => console.error('Error updating user status', error));
    }
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUser = userData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
	<>

  {/* <div className='mt-10 mx-5 p-5 rounded-lg'>
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
  </div> */}
    <div className='flex justify-center'>
          <h1 className='text-white text-3xl my-3'>User list:</h1>
        </div>
      <div className="overflow-x-auto flex justify-center">
      
        <div className="inline-block">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900">
            <thead className="dark:bg-black">
              <tr>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=" dark:bg-gray-800">
              {currentUser.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-950 dark:bg-gray-950' : 'bg-gray-900 dark:bg-gray-900'}>
                   <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {user.user_id}
                  </td>
                   <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {user.username}
                  </td>
                 
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                    {user.date_of_birth}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                   {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-md leading-5 text-white">
                  {
                  (user.status==1)?<button onClick={()=>disable_enable(user.user_id,user.status)} className='bg-gray-700 hover:bg-gray-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>Disable</button>:
                  <button onClick={()=>disable_enable(user.user_id,user.status)}  className='bg-green-700 hover:bg-green-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>Enable</button>
                }
                 <button onClick={()=>handleDelete(user.user_id)} className='bg-red-700   border-gray-800 border-2 rounded-lg text-white px-2 py-1 hover:cursor-pointer hover:bg-red-600 duration-200 '>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination flex justify-center items-center mt-5">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-700 text-white px-3 py-1 rounded-l"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-white px-3 py-1 rounded-r"
            >
              Next
            </button>
          </div>  
        </div>
      </div>
  </>
  )
}
export default AdminHome