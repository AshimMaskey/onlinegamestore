import React, { useContext, useState } from 'react';
import AdminContext from '@/Components/Context/AdminContext';
import { toast } from 'react-toastify';
import Confirm from '@/Components/Confirm/Confirm';

function AdminForm({ onClose }) {
    const { admin, updateAdmin } = useContext(AdminContext);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [formData, setFormData] = useState({
        admin_id: admin.admin_id,
        admin_name: admin.admin_name || '',
        email: admin.email || '',
        phone: admin.phone || '',
        dob: admin.date_of_birth || '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!/^[a-zA-Z\s]{3,25}$/.test(formData.admin_name)) {
            errors.admin_name = "Admin name should be 3-25 characters and shouldn't include special characters or numbers.";
        }
        if (!/^([a-zA-Z\d\.-]+)@([a-zA-Z\d-]+)\.([a-zA-Z]{2,4})$/.test(formData.email)) {
            errors.email = "It should be a valid email address.";
        }
        if (!/^\+?[0-9]{5,15}$/.test(formData.phone)) {
            errors.phone = "It should be numbers only and 5-15 characters.";
        }
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{5,20}$/.test(formData.password)) {
            errors.password = "Password should be 5-20 characters and include at least 1 letter and 1 number.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setFormErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsOpenConfirm(true);
        }
    };

    const handleConfirm = () => {
        setIsOpenConfirm(false);
        fetch('http://localhost/onlinegamestore/admin/editprofile.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            if (data.success) {
                toast.success('Profile Updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                updateAdmin({ ...admin, ...formData });
                onClose(false);
            } else {
                console.error('Failed to update data');
            }
        })
        .catch(error => console.error('Error updating user', error));
    };

    const handleCancel = () => {
        setIsOpenConfirm(false);
    };

    return (
        <div className='mb-3'>
            <h2 className='my-3 text-3xl text-center'>Edit Profile</h2>
            <form className='mx-5' onSubmit={handleSubmit}>
                <div className='flex flex-col mb-3'>
                    <label className='text-xl mr-2' htmlFor="admin_name">Admin Name:</label>
                    <input
                        className='border-gray-400 py-1 border-2 rounded-md text-lg pl-2'
                        type="text"
                        id="admin_name"
                        name="admin_name"
                        value={formData.admin_name}
                        onChange={handleChange}
                        required
                    />
                    {formErrors.admin_name && <div className='text-red-500'>{formErrors.admin_name}</div>}
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
                    {formErrors.email && <div className='text-red-500'>{formErrors.email}</div>}
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
                    {formErrors.phone && <div className='text-red-500'>{formErrors.phone}</div>}
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
                    {formErrors.password && <div className='text-red-500'>{formErrors.password}</div>}
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
            <Confirm message="Update Your Profile?" onCancel={handleCancel} onConfirm={handleConfirm} isOpen={isOpenConfirm} />
        </div>
    );
}

export default AdminForm;