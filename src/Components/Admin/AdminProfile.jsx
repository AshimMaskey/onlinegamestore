import React, { useContext } from 'react'
import { useState } from 'react';
import AdminContext from '../Context/AdminContext'
import { userimg } from '@/assets/images';
import EditForm from './AdminProfileUpdate/EditForm';
import Form from './AdminProfileUpdate/form';

function AdminProfile() {
  const {admin}=useContext(AdminContext);
  const [showModal, setShowModal]=useState(false);
  return (
    <>
    <div className='my-10'>
    <h1 className='text-white text-3xl text-center' >Your Profile:</h1>
    </div>
      <div className='mb-20 rounded-sm gap-y-10 gap-x-10 flex justify-between flex-wrap mx-auto bg-[#2A2A2A] p-10 max-w-5xl'>
        <div className='mx-auto flex flex-col items-center gap-y-4'>
          <div>
            <img className='w-32 rounded-full' src={userimg} alt='' />
          </div>
          <div>
            <button onClick={()=>setShowModal(true)} className='bg-teal-500 text-white px-4 py-2 text-2xl rounded-lg hover:bg-teal-600 duration-200'>Edit Profile</button>
          </div>
          {/* <div>
            <button className='bg-white rounded-lg text-xl px-3 py-2 text-black hover:bg-gray-300 duration-200 hover:underline' onClick={handleLogout}>Logout</button>
          </div> */}
        </div>
        <div className='flex mx-auto flex-col justify-center'>
          <div className=' text-lg text-gray-300 md:text-xl pb-6'>Admin Name: <span className='text-gray-100'>{admin.admin_name}</span></div>
          <div className='text-gray-300 text-lg md:text-xl pb-6'>Email: <span className='text-gray-100'>{admin.email}</span></div>
          <div className='text-gray-300 text-lg md:text-xl pb-6'>Date of birth: <span className='text-gray-100'>{admin.date_of_birth}</span></div>
          <div className='text-gray-300 text-lg md:text-xl pb-6'>Phone: <span className='text-gray-100'>{admin.phone}</span></div>
        </div>
      </div>
      <EditForm isVisible={showModal} onClose={setShowModal} >
        <Form onClose={setShowModal} />
      </EditForm>
    </>
    );
}

export default AdminProfile