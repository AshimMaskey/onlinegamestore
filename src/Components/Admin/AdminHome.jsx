import React, { useState, useEffect } from 'react';
import { exportToExcel, exportToPDF } from '../pdf_excel/ExportUtils';
import Confirm from '../Confirm/Confirm';
import { showToast } from '../toast/toast';

function AdminHome() {
  const [adminData, setAdminData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetch('http://localhost/onlinegamestore/admin/showadmin.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setAdminData(data))
      .catch(error => console.error('error fetching data', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost/onlinegamestore/admin/showuser.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('error fetching data', error));
  }, []);

  const handleDelete2 = userId => {    
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
            showToast({message:"User deleted succesfully!!", condition:"success"});
          } else {
            console.error(`Failed to delete user with ID ${userId}`);
          }
        })
        .catch(error => console.error('error deleting user', error));   
  };

  
  const disable_enable = (id, status) => {
    
    
      fetch('http://localhost/onlinegamestore/admin/update_user_status.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: id, status: status == 1 ? 0 : 1 }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            setUserData(userData.map(user => (user.user_id == id ? { ...user, status: status == 1 ? 0 : 1 } : user)));
          } else {
            console.error('Failed to update user status');
          }
        })
        .catch(error => console.error('Error updating user status', error));
    
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUser = userData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const columns = [
    { Header: 'ID', accessor: 'user_id' },
    { Header: 'Username', accessor: 'username' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Date of Birth', accessor: 'date_of_birth' },
    { Header: 'Phone', accessor: 'phone' },
  ];
  const handleExportToPdf=()=>{
    const result=confirm('Export as PDF?');
    if(result){
      exportToPDF(userData, columns);
    }
  }
  const handleExportToExcel=()=>{
    const result=confirm('Export as Excel?');
    if(result){
      exportToExcel(userData, columns);
    }
  }
  
  //for deleting the user confirm box
  const [isOpenConfirm, setIsOpenConfirm]=useState(false);
  const [user_id, setUserId]=useState(null);
  const handleDelete=(userid)=>{
    setIsOpenConfirm(true);
    setUserId(userid);
  }
  const handleCancel=()=>{
      setIsOpenConfirm(false);
  }
  const handleConfirm=()=>{
    setIsOpenConfirm(false);
    handleDelete2(user_id);
  }

  //for enable/disable user confirm box
  const [isOpenConfirm1, setIsOpenConfirm1]=useState(false);
  const [user_id1, setUserId1]=useState(null);
  const [user_status, setUserStatus]=useState(null);
  const [actionValue, setActionValue]=useState(null);
  const handleClick=(userid, userstatus)=>{
    const action = userstatus == 1 ? 'Disable' : 'Enable';
    setActionValue(action);
    setIsOpenConfirm1(true);
    setUserId1(userid);
    setUserStatus(userstatus);
  }
  const handleCancel1=()=>{
      setIsOpenConfirm1(false);
  }
  const handleConfirm1=()=>{
    setIsOpenConfirm1(false);
    disable_enable(user_id1,user_status);
  }

  return (
    <>
      <div className='ml-10'>
        <h1 className='text-white text-3xl my-3'>User List</h1>
      </div>
      <div className='ml-10 mb-4'>
        <button onClick={handleExportToPdf} className='bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer text-white px-4 py-2 rounded-lg mr-2'>
          Export to PDF
        </button>
        <button onClick={handleExportToExcel} className='bg-green-500 hover:bg-green-600 duration-200 cursor-pointer text-white px-4 py-2 rounded-lg'>
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto ml-10">
        <div className="inline-block">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-900">
            <thead className="dark:bg-black">
              <tr>
                {columns.map(column => (
                  <th key={column.accessor} className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                    {column.Header}
                  </th>
                ))}
                <th className="px-6 py-3 bg-black text-white text-left text-md md:text-lg leading-4 font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-800">
              {currentUser.map((user, index) => (
                <tr key={index} className={index % 2 == 0 ? 'bg-gray-950 dark:bg-gray-950' : 'bg-gray-900 dark:bg-gray-900'}>
                  {columns.map(column => (
                    <td key={column.accessor} className="px-6 py-4 whitespace-no-wrap text-md md:text-lg leading-5 text-white">
                      {user[column.accessor]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-no-wrap text-md md:text-md leading-5 text-white">
                    {user.status == 1 ? (
                      <button onClick={() => handleClick(user.user_id, user.status)} className='bg-gray-700 hover:bg-gray-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>
                        Disable
                      </button>
                    ) : (
                      <button onClick={() => handleClick(user.user_id, user.status)} className='bg-green-700 hover:bg-green-600 border-gray-800 border-2 duration-200 px-2 py-1 rounded-lg mr-1'>
                        Enable
                      </button>
                    )}
                    <button onClick={() => handleDelete(user.user_id)} className='bg-red-700 border-gray-800 border-2 rounded-lg text-white px-2 py-1 hover:cursor-pointer hover:bg-red-600 duration-200'>
                      Delete
                    </button>
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
      <Confirm message={`${actionValue} user?`} onCancel={handleCancel1} onConfirm={handleConfirm1} isOpen={isOpenConfirm1}/>
      <Confirm message="Delete the user permanently?" onCancel={handleCancel} onConfirm={handleConfirm} isOpen={isOpenConfirm}/>
    </>
  );
}

export default AdminHome;
