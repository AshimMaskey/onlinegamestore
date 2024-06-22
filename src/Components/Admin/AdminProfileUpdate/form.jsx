import AdminContext from '@/Components/Context/AdminContext';
import React, { useContext, useState } from 'react'
// import AdminContext from '../Context/AdminContext'
import { toast } from 'react-toastify';

function Form({onClose}) {
	const {admin,setAdmin}=useContext(AdminContext);
	console.log(admin);
	const [formData,setFormData]=useState({
		admin_id:admin.admin_id,
		admin_name:admin.admin_name || '',
		email:admin.email || '',
		phone:admin.phone || '',
		dob:admin.date_of_birth || '',
		password:''
	});

	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

	const handleSubmit=(e)=>{
		e.preventDefault();
		const result=confirm('Are you sure you want to save the changes?');
        if(result)
        {
            fetch('http://localhost/onlinegamestore/admin/editprofile.php',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{
                throw new Error('network error was not ok');
            }
        })
        .then(data=>{
            if(data.success){
                toast.success('Profile edited successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                setAdmin({ ...admin, ...formData });
                onClose(false);
            }
            else{
                console.error('failed to update data');
            }
        })
        .catch(error=>console.error('error updating user', error));
        }
	}
  return (
	<div className='mb-3'>
		<h2 className='my-3 text-3xl text-center'>Edit Profile</h2>
            <form className='mx-5' onSubmit={handleSubmit}>
                <div className='flex flex-col mb-3'>
                    <label className='text-xl mr-2' htmlFor="admin_name">Admin name:</label>
                    <input
						className='border-gray-400 py-1 border-2 rounded-md text-lg pl-2'
                        type="text"
                        id="admin_name"
                        name="admin_name"
                        value={formData.admin_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-xl mr-2' htmlFor="email">Email:</label>
                    <input
                        type="email"
						className='border-gray-400 py-1 border-2 rounded-md text-lg pl-2'
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-xl mr-2' htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
						className='border-gray-400 py-1 border-2 rounded-md text-lg pl-2'
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-xl mr-2' htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
						className='border-gray-400 py-1 border-2 rounded-md text-lg pl-2'
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-xl mr-2' htmlFor="password">New Password:</label>
                    <input
                        type="password"
						className='border-gray-400 py-1 border-2 rounded-md text-lg pl-2'
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="mr-2 px-4 py-2 text-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
            </form>
	</div>
  )
}

export default Form